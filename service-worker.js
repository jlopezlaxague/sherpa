self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('hello-pwa-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/manifest.json',
          '/icons/icon-192.png',
          '/icons/icon-512.png'
        ]);
      })
    );
    self.skipWaiting();
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  });
  