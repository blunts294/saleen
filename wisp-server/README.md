# Saleen Wisp server

This is your own [Wisp](https://github.com/MercuryWorkshop/wisp-protocol) relay.
Saleen uses it to reach stream hosts that the public relay cannot, so the only
host the browser talks to is your relay.

The app tries a personal relay first and keeps the public relay as a fallback.

## One click (Windows, no account)

Double-click **`start-wisp.cmd`**.

It will:

1. install the relay dependency (first run),
2. start the relay on port 5001,
3. download Cloudflare's free `cloudflared` once (about 55 MB, saved in
   `%LOCALAPPDATA%\SaleenWisp`, not in this folder),
4. open a quick tunnel and print:

```
Relay URL:
  wss://something.trycloudflare.com

Open this link (it saves the relay automatically):
  https://cdn.jsdelivr.net/gh/blunts294/saleen@v7/period3.svg?wisp=wss%3A%2F%2F...
```

Open that last link, keep the window open while watching, and press `Ctrl+C`
when done. Every run prints a fresh link. The app stores the relay, so ordinary
bookmarks without `?wisp=` keep using it until it goes offline, then the public
relay takes over.

## Run the relay only

```bash
cd wisp-server
npm install
npm start
# health check: http://localhost:5001/healthz
```

`ws://127.0.0.1:5001/` works for pages served over plain HTTP or local files.
HTTPS pages (including the jsDelivr links) need the `wss://` tunnel address.

## Deploy permanently

Pick one host. All of them give you a `wss://...` address.

### Render (easiest, free)

1. Push this folder to a GitHub repo.
2. Render → **New → Blueprint** → select the repo. It reads `render.yaml`.
3. Copy the service URL and use `wss://<service>.onrender.com/`.

Free Render services sleep after ~15 minutes idle, so the first page load after
a break takes a few seconds.

### Fly.io (always on)

```bash
cd wisp-server
fly launch --no-deploy --copy-config
fly deploy
```

### Railway

1. **New Project → Deploy from GitHub**, pick the repo.
2. Railway detects Node, sets `PORT` itself. Start command: `node server.mjs`.

### Any VPS with Docker

```bash
docker build -t saleen-wisp .
docker run -d --restart unless-stopped -p 5001:5001 --name saleen-wisp saleen-wisp
```

Put Caddy or nginx in front for TLS, then use `wss://your-domain/`.

## Connect Saleen to it

- open the `?wisp=` link printed by the script (saves it automatically), or
- paste the `wss://` address into **Settings → Wisp relay → Save relay**, or
- run once in the console:
  `localStorage.setItem('saleen.wisp', 'wss://your-host/')`.

The Wisp handshake is a WebSocket upgrade on `/`, so no other path or CORS
configuration is needed.
