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
}

self.addEventListener('install', event => {
	report(`install event received: ${event}`);
	// Kick out the old service worker
	self.skipWaiting();
});

self.addEventListener('periodicsync', (event) => {
	report(`periodicsync event received: ${event}`);
	if (event.tag === 'content-sync') {
		event.waitUntil(fetch_content());
	}
});
