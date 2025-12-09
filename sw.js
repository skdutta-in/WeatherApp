const CACHE_NAME = 'weather-app-v1';
const urlsToCache = [
'/', '/index.html', '/styles.css', '/app.js', '/manifest.json',
'https://cdn.jsdelivr.net/npm/chart.js'
];
self.addEventListener('install', e=>{
e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', e=>{
const req = e.request;
// network-first for API calls, cache-first for assets
if(req.url.includes('api.openweathermap.org')){
e.respondWith(fetch(req).catch(()=>caches.match(req)));
return;
}
e.respondWith(caches.match(req).then(r=>r || fetch(req)));
});
self.addEventListener('activate', e=>{
e.waitUntil(self.clients.claim());
});