// Service worker for the kintai PWA.
// Caches static assets so the app is installable / works briefly offline.
// API calls to Google Apps Script always go to the network.

const CACHE_NAME = "kintai-v5";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./ROBATANARU.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Always go to network for the Apps Script API — never cache responses.
  if (url.indexOf("script.google.com") !== -1 ||
      url.indexOf("googleusercontent.com") !== -1) {
    return;
  }

  // Cache-first for static GET requests.
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        // Opportunistically cache same-origin responses.
        if (resp && resp.status === 200 && resp.type === "basic") {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return resp;
      });
    })
  );
});
