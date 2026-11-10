# Saleen Wisp server

This is your own [Wisp](https://github.com/MercuryWorkshop/wisp-protocol) relay.
Saleen's browser tab uses it to fetch pages without a public CORS proxy, so the
only host your browser talks to directly is this server.

The app already tries a personal relay first and falls back to the public one.

## Run locally

```bash
cd wisp-server
npm install
npm start
# wss://localhost:5001/  (use ws:// for plain local testing)
```

Test it:

```bash
curl http://localhost:5001/healthz
# ok
```

## Deploy

Pick one host. All of them give you a `wss://...` address.

### Render (easiest, free)

1. Push this folder to a GitHub repo.
2. Render → **New → Blueprint** → select the repo. It reads `render.yaml`.
3. Copy the service URL and use `wss://<service>.onrender.com/`.

Free Render services sleep after ~15 minutes idle, so the first page load after
a break takes a few seconds. Fine for personal use.

### Fly.io (always on)

```bash
cd wisp-server
fly launch --no-deploy --copy-config
fly deploy
```

Your endpoint is `wss://saleen-wisp.fly.dev/`.

### Railway

1. **New Project → Deploy from GitHub**, pick the repo.
2. Railway detects Node, sets `PORT` itself. Start command: `node server.mjs`.
3. Use `wss://<service>.up.railway.app/`.

### Any VPS with Docker

```bash
docker build -t saleen-wisp .
docker run -d --restart unless-stopped -p 5001:5001 --name saleen-wisp saleen-wisp
```

Put Caddy or nginx in front for TLS, then use `wss://your-domain/`.

## Connect Saleen to it

Once deployed, either:

- open the app and run once in the console:
  `localStorage.setItem('saleen.wisp', 'wss://your-host/')`, or
- edit `OWN_WISP` in `app.js` and rebuild.

The Wisp handshake is a WebSocket upgrade on `/`, so no other path or CORS
configuration is needed.
