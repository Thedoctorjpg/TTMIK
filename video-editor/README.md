# Video Editor

A static web-based video editing suite published to GitHub.

## Included entrypoints

- `index.html` — primary launcher and PWA entrypoint
- `AI video editor` — AI-powered editor build
- `Video Editor Pro` — primary orchestrator app with TensorFlow integration
- `video-editor-pro-worker.html` — worker-backed editing demo
- `video-editor-ultimate.html` — FFmpeg.wasm-based editor demo

## PWA and metadata

- `manifest.json` — web app manifest for installable PWA behavior
- `sw.js` — service worker caching static assets for offline use
- `package.json` — repository metadata and local development scripts
- `RELEASE_NOTES.md` — release summary for the initial bundle

## Local development

Serve the repository from a local web server to avoid browser restrictions on file URLs:

```bash
cd /home/david/Documents/video-editor
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Release notes

See `RELEASE_NOTES.md` for the initial release summary.
