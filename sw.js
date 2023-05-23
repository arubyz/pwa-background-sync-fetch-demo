// Change this value to force the cache to update
const cacheName = "cache";

let manifest_counter = 1;

const registration = self.registration;

const channelName = 'test-channel';
const channelSend = new BroadcastChannel(channelName);

function report(result) {
	channelSend.postMessage({ result });
}

async function fetch_content() {
	report('periodicsync event received');
}

self.addEventListener('install', event => {
	// Kick out the old service worker
	self.skipWaiting();
});

self.addEventListener('periodicsync', (event) => {
	if (event.tag === 'content-sync') {
		event.waitUntil(fetch_content());
	}
});
