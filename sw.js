const CACHE = 'medsaathi-v1';
const FILES = [
  '/medsaathi/index.html',
  '/medsaathi/dashboard.html',
  '/medsaathi/streaks.html',
  '/medsaathi/manifest.json'
];

// Install — cache all files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});