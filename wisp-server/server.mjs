import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

/*
 * Saleen's private Wisp relay.
 *
 * Wisp is the transport Saleen's browser tab uses to reach the web without a
 * CORS relay. This server only speaks WebSocket upgrades; the tiny HTTP routes
 * below exist so hosts (Render, Fly, Railway, uptime checks) see a healthy app.
 */

const PORT = Number(process.env.PORT || 5001);
const HOST = process.env.HOST || "0.0.0.0";

/* Sensible defaults for a public relay. Tighten these if you fork it. */
wisp.options.wisp_version = 2;
wisp.options.wisp_motd = "Saleen";
wisp.options.allow_private_ips = false;
wisp.options.allow_loopback_ips = false;
wisp.options.stream_limit_per_host = -1;
wisp.options.stream_limit_total = -1;

const server = http.createServer((req, res) => {
  if (req.url === "/healthz" || req.url === "/health") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end("ok");
    return;
  }

  res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  res.end(
    "Saleen wisp server\n\n" +
      "This endpoint is a WebSocket relay. Point the app at:\n" +
      "  wss://" + (req.headers.host || "your-host") + "/\n"
  );
});

server.on("upgrade", (req, socket, head) => {
  /* A client that vanishes mid-handshake should not take the process down. */
  socket.on("error", () => {});
  try {
    wisp.routeRequest(req, socket, head);
  } catch (err) {
    try { socket.destroy(); } catch (e) {}
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Saleen wisp listening on ${HOST}:${PORT}`);
  console.log(`Use: wss://<your-host>/`);
});

function shutdown() {
  console.log("shutting down");
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 5000).unref();
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
