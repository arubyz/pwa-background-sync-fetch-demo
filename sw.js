// Change this value to force the cache to update
const cacheName = "cache";

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();
});

self.addEventListener('periodicsync', (event) => {
	if (event.tag === 'content-sync') {
		//event.waitUntil(fetchContent());
	}
});
