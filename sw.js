// Change this value to force the cache to update
const cacheName = "cache";

let manifest_counter = 1;

const registration = self.registration;

const channelName = 'test-channel';
const channelSend = new BroadcastChannel(channelName);

function report(result) {
	const data = { result };
	console.log(`service worker sending message: ${data}`);
	channelSend.postMessage(data);
}

async function fetch_content() {
}

// Listeneing to every possible service worker event to report on them
for (const key in self) {
    if(/^on/.test(key)) {
        const eventType = key.substr(2);
		report(`registering for service worker event ${eventType}`);
        self.addEventListener(eventType, event => {
			if (eventType === 'fetch') {
				report(`service worker FETCH event received received: (${event.request.url}) ${JSON.stringify(event.request)}`);
			} else {
				report(`service worker ${eventType} event received received: ${JSON.stringify(event)}`);
			}
		});
    }
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
