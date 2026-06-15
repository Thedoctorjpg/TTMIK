const CACHE_NAME = 'video-editor-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.svg',
  './assets/icon-512.svg',
  './AI video editor',
  './Video Editor Pro',
  './video-editor-pro-worker.html',
  './video-editor-ultimate.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : Promise.resolve())
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => cachedResponse || fetch(event.request))
  );
});
