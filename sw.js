// Network-first with offline fallback (same pattern as 3D Labyrinth).
// Every release bumps CACHE_VERSION together with VERSION in index.html; tests/version.test.mjs enforces it.
const CACHE_PREFIX = 'murphy-';
const CACHE_VERSION = 'murphy-v1.1.2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './laws.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    // cache: 'reload' = straight from the network: the HTTP cache may still hold the previous release
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS_TO_CACHE.map(u => new Request(u, { cache: 'reload' }))))
      .catch(err => console.warn('[SW] pre-cache:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      // Only our own old caches: the other apps on srathinagiri.github.io keep their offline copies.
      .then(names => Promise.all(names.filter(n => n.startsWith(CACHE_PREFIX) && n !== CACHE_VERSION).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  // Revalidate with the server ('no-cache'): GitHub Pages lets the HTTP cache keep files for 10 minutes.
  // Navigations can't take a RequestInit, so fetch them as-is.
  const req = event.request;
  const network = req.mode === 'navigate' ? fetch(req) : fetch(req, { cache: 'no-cache' });
  event.respondWith(
    network.then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(event.request, copy));
      }
      return res;
    }).catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
