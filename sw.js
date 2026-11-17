/*
 * Saleen's page worker.
 *
 * Scramjet rewrites the page, this worker serves it. It only ever touches
 * requests under its own "<app dir>sj/" prefix, so the app page itself and the
 * CDN files next to it are never intercepted.
 */
importScripts("https://cdn.jsdelivr.net/npm/@mercuryworkshop/scramjet@1.1.0/dist/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

const DIR = new URL("./", self.location.href).href;
const PREFIX = DIR + "sj/";
/* Scramjet injects its wasm into proxied pages, so this one file has to come
   through the worker even though it sits outside the proxy prefix. */
const WASM = "/npm/@mercuryworkshop/scramjet@1.1.0/dist/scramjet.wasm.wasm";

let primed = false;

/*
 * The controller also posts its config straight into this worker, but that
 * path never installs the codec globals. Reading the stored config once and
 * letting loadConfig run fixes that, and it must happen before the first
 * proxied request or the worker throws on an undefined prefix.
 */
async function prime() {
	if (primed) return true;
	scramjet.config = null;
	try {
		await scramjet.loadConfig();
	} catch (e) {
		scramjet.config = null;
	}
	if (scramjet.config) primed = true;
	return primed;
}

async function handle(event) {
	if (!(await prime())) return fetch(event.request);
	if (!scramjet.config) return fetch(event.request);
	if (scramjet.route(event)) return scramjet.fetch(event);
	return fetch(event.request);
}

self.addEventListener("install", () => {
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
	let url;
	try {
		url = new URL(event.request.url);
	} catch (e) {
		return;
	}
	if (url.origin !== self.location.origin) return;
	if (url.href.indexOf(PREFIX) !== 0 && url.pathname !== WASM) return;
	event.respondWith(handle(event));
});
