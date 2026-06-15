// Creative Corner - Basic Service Worker for PWA
// Provides offline shell + caching for the prototype.
// Note: Media uploads are not cached (user data stays local).

const CACHE_NAME = 'creative-corner-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  // External CDNs are not precached to avoid staleness / CORS issues.
  // The app gracefully degrades if offline (core JS/CSS is inline + Tailwind CDN on first load).
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET
  if (req.method !== 'GET') return;

  // For same-origin requests, try cache first, then network.
  if (new URL(req.url).origin === location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          // Cache successful responses for app shell
          if (res.ok) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, resClone));
          }
          return res;
        }).catch(() => caches.match('./index.html'));
      })
    );
    return;
  }

  // External resources (Tailwind CDN, FontAwesome, picsum placeholders etc.): network first, no cache.
  event.respondWith(
    fetch(req).catch(() => {
      // If offline and it's a navigation/image request, you could return a fallback.
      // For simplicity we just let it fail gracefully.
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    })
  );
});

// Optional: message handler for future "skip waiting" or clear cache from UI.
self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') {
    self.skipWaiting();
  }
});
