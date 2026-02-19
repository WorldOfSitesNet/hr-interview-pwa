const CACHE_NAME = 'hr-helper-v1.3.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/script.js',
  './assets/js/translations.js',
  './assets/vendors/bootstrap/bootstrap.min.css',
  './assets/vendors/bootstrap/bootstrap.bundle.min.js',
  './assets/vendors/bootstrap-icons/bootstrap-icons.css',
  './assets/vendors/bootstrap-icons/fonts/bootstrap-icons.woff',
  './assets/vendors/bootstrap-icons/fonts/bootstrap-icons.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin) && !event.request.url.includes('cdn.jsdelivr.net')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cacheCopy);
          });
        }
        return networkResponse;
      }).catch(() => {

      });

      return cachedResponse || fetchPromise;
    })
  );
});