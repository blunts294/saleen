/*
 * bare-mux lives on npm; a SharedWorker has to be same-origin, so this tiny
 * wrapper pulls the real worker in.
 */
importScripts("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2.1.9/dist/worker.js");
