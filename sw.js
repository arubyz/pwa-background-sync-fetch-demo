// Change this value to force the cache to update
const cacheName = "cache";

let manifest_counter = 1;

const registration = self.registration;

const channelName = 'log-channel';
const channelSend = new BroadcastChannel(channelName);

function report(result) {
	console.log(`service worker message: ${result}`);

	const data = { result };
	channelSend.postMessage(data);
}

async function fetch_content() {
}

report('-------------------- loading service worker (build 17)');

// Listeneing to every possible service worker event to report on them
for (const key in self) {
    if(/^on/.test(key)) {
        const eventType = key.substr(2);
		report(`registering for service worker event ${eventType}`);
        self.addEventListener(eventType, event => {
			if (event instanceof FetchEvent) {
				report(`service worker FetchEvent received: ${event.request.method} ${event.request.url}`);
			} else {
				report(`service worker ${eventType} event received: ${JSON.stringify(event)}`);
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
