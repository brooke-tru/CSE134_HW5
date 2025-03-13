// sw.js - Main Service Worker

const URLS_TO_CACHE = [
    '/',
    '/home.html',
    '/src/home.css',
    '/src/home.js',
    '/src/projectcard.js',
    '/media/favicon.ico',
    '/media/judydoll.webp',
    '/media/rem_beauty_logo.webp',
    '/media/roundlab.webp',
    '/media/tiktok.jpg',
    '/media/yesstyle.webp'
  ];

const CACHE_NAME = 'mysite-cache'; 

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();
  

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};
  
self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache(URLS_TO_CACHE),
  );
  self.skipWaiting();
});
  

self.addEventListener('activate', (event) => {
  console.log('Service worker activated!');
});
  
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
  