const CACHE_NAME = 'softpoint-v2';
const CORE_ASSETS = [
  '/softpoint/',
  '/softpoint/index.html',
  '/softpoint/manifest.json',
  '/softpoint/assets/tt.gif'
];

self.addEventListener('install', event => {
  console.log('Установка Service Worker, кэширование: ', CORE_ASSETS);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          CORE_ASSETS.map(url => {
            return cache.add(url).catch(err => {
              console.warn(`Не удалось кэшировать ${url}:`, err);
              return Promise.resolve();
            });
          })
        );
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/softpoint/index.html'))
  );
});
