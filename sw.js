// sw.js (минимальная рабочая версия)
const CACHE_NAME = 'softpoint-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/tt.gif',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});