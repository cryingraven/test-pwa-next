const cacheName = 'NoteApp';

self.addEventListener("install", function (event) {
    event.waitUntil(preLoad());
});

const preLoad = function () {
    return caches.open(cacheName).then(function (cache) {
        return cache.addAll(filesToCache);
    });
};

const filesToCache = [
    '/',
    '/android-icon-36x36.png',
    '/android-icon-48x48.png',
    '/android-icon-72x72.png',
    '/android-icon-96x96.png',
    '/android-icon-144x144.png',
    '/android-icon-192x192.png',
    '/apple-icon-57x57.png',
    '/apple-icon-60x60.png',
    '/apple-icon-72x72.png',
    '/apple-icon-76x76.png',
    '/apple-icon-114x114.png',
    '/apple-icon-120x120.png',
    '/apple-icon-144x144.png',
    '/apple-icon-152x152.png',
    '/apple-icon-180x180.png',
    '/apple-icon-precomposed.png',
    '/apple-icon.png',
    '/ms-icon-70x70.png',
    '/ms-icon-144x144.png',
    '/ms-icon-150x150.png',
    '/ms-icon-310x310.png'
];

self.addEventListener('fetch', (event) => {
  // Check if this is a navigation request
  if (event.request.mode === 'navigate') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the network first
      return fetch(event.request.url).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());

        return fetchedResponse;
      }).catch(() => {
        // If the network is unavailable, get
        return cache.match(event.request.url);
      });
    }));
  } else {
    return;
  }
});