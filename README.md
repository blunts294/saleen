# Saleen

A one-file, ad-free movie/TV/games front end with a classroom disguise. The
interface is plain HTML/CSS/JS, the player is native (HLS), and the browser tab
runs its own Scramjet engine through your Wisp relay.

## Links (v17)

Every link below serves the same build. If one host is blocked at school, try
the next.

**App (neutral filename `period3.svg`)**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v17/period3.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v17/period3.svg

**Class disguise page**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v17/class.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v17/class.svg

Older tags are offline; only `v17` and `main` resolve.

## Your own relay (recommended)

The public relay cannot reach some TV stream hosts. The relay in `wisp-server/`
can, and the helper script gives you a public `wss://` link in one double-click:

1. Open `wisp-server/start-wisp.cmd`.
2. Wait for **Relay is live**.
3. Open the app link it prints. It ends in `?wisp=wss://...` and saves the relay
   on first load.

Keep the window open while watching. Each run prints a fresh link; the app also
remembers the last relay and falls back to the public one if it is offline.
The helper downloads Cloudflare's free `cloudflared` once (about 55 MB, no
account needed) and starts a quick tunnel to the relay on port 5001.

The relay is passed in the link, not typed into Settings. Settings is for the
look of the app and shows what is saved on the device.

## What is in v17

- **Real browsing, not a reader**: every tab now runs Scramjet inside the app.
  The service worker (`sw.js`) and the transport worker (`bmworker.js`) sit next
  to the app on the same CDN host, fetch the page through your Wisp relay and
  rewrite it the way a proxy browser does. TikTok, Instagram, Discord, Google
  and Wikipedia render their real pages, scripts and video feeds.
- **Nothing to block by name**: proxied addresses are base64url, so the path
  never contains `tiktok.com` or `youtube.com`. A filter sees one host: the CDN
  the app already came from.
- **The old pipeline is still the safety net**: if a browser cannot run the
  worker (private mode, worker blocked, an old Chrome), tabs fall back to the
  existing fetched reader view instead of dying.
- **Games that cannot fail**: 2048, Snake and Breakout ship inside the app and
  sit at the front of the shelf with an `offline` badge. They need no network at
  all, so the Games tab always has something playable.
- **Games that used to half-load**: mirrors are asked in filter-safe order
  (Statically first) and a game whose own code points at raw GitHub gets that
  base rewritten to jsDelivr, so games like Geometry Dash load their assets
  instead of a block page.
- **Saleen logo**: a violet squircle with the white S and dot, drawn inline in
  the SVG build (no extra file to fetch), plus a neutral school-blue document
  favicon.
- **Episodes stay fixed**: the 48s budget, three mirrors and per-mirror watchdog
  from v16 are unchanged, as are the segment prefetch and the ABR tweaks.
- **Harder to copy**: the shipped JavaScript is minified with mangled names,
  the right-click menu and the common source/devtools shortcuts are blocked, and
  the plain HTML build is not published. There is only the SVG app.
- **School-safe links**: the Links tab lists only the two CDN hosts schools
  normally allow. Raw GitHub, githack and the HTML file are gone.
- **Saved progress**: game saves live in the app's own storage, keyed per game,
  and a **Continue** button opens the last game you played.
- **Pinned picks**: 47 films and 35 shows, including Blood and Bone, Never Back
  Down, White Chicks and The Flash (2014, 9 seasons).
- **Games**: 850 playable HTML games, bundled so the grid paints instantly.
- **No music tab.** The dock has Home, AI, Links, Games, Movies, TV, Settings.

## Known limits

- YouTube and ChatGPT load their shells but not their apps through most
  proxies. YouTube serves its "enable JavaScript" page and ChatGPT answers 403
  to relay IPs. That is the site rejecting the request, not the app; TikTok,
  Instagram and Discord do not.
- The school can still block the CDN host itself, and a self-hosted relay can
  be flagged. The codec keeps site names out of the address bar, but nothing can
  promise a network owner will not notice traffic.
- Closing a tab cannot be prevented. The app asks for confirmation
  (`beforeunload`) as a best effort.

## Classroom disguise

- The tab title is `Biology 3 - Period 3`.
- Press `Esc` or `` ` `` to swap the whole app for a fake Biology class call;
  press again to come back.
- A 30x30 invisible button in the top-right corner does the same.
- `class.svg` is a standalone, convincing class call. Nothing on it mentions
  Saleen. To open the app from it, type `saleen` or press `\`. There is no
  visible button or hint.

## Playback

Saleen asks the catalogue provider for its English HLS mirrors, decrypts them in
the page, probes every mirror at once through your relay, and plays the first
one that delivers a real video fragment. Every non-English mirror is dropped
before the player is built, so there is nothing to switch to and no language
panel to leak. A title with no working English mirror gets a clear message and
a **Try again** button.

## Files

- `saleen.svg` / `period3.svg` - the app as a standalone SVG document.
- `class.svg` - the classroom disguise page.
- `sw.js` - the page worker (Scramjet service worker).
- `bmworker.js` - the bare-mux transport worker.
- `wisp-server/` - the private relay, start scripts and deploy configs.

## Updating

Pinned links (`@v17`) never change. `@main` can take up to 12 hours at the edge.
Purge a file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@v17/period3.svg`
