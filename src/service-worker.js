const CACHE_NAME = 'revision-guide-v1';

// Files to cache immediately when service worker installs
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/main.js',
  // Add your JS bundles here (whatever Webpack outputs)
  // '/main.bundle.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If we have a cached response, return it
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', event.request.url);
        return cachedResponse;
      }
      
      // Otherwise, fetch from network and cache it
      return fetch(event.request).then((networkResponse) => {
        // Only cache successful responses
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        
        // Clone the response (can only be consumed once)
        const responseToCache = networkResponse.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          // Cache JSON files from GitHub
          if (event.request.url.includes('.json')) {
            console.log('Service Worker: Caching JSON:', event.request.url);
            cache.put(event.request, responseToCache);
          }
          // Also cache other assets (CSS, JS, images)
          else if (event.request.url.includes(self.location.origin)) {
            cache.put(event.request, responseToCache);
          }
        });
        
        return networkResponse;
      });
    }).catch((error) => {
      console.error('Service Worker: Fetch failed:', error);
      // You could return a custom offline page here
    })
  );
});