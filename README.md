# Saleen

A one-file, ad-free movie/TV/games front end with a classroom disguise. The
interface is plain HTML/CSS/JS, the player is native (HLS), and the browser tab
runs its own Scramjet engine through your Wisp relay.

## Links (v18)

Every link below serves the same build. If one host is blocked at school, try
the next.

**App (neutral filename `period3.svg`)**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v18/period3.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen@v18/period3.svg

**Class disguise page**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v18/class.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen@v18/class.svg

Statically's old `/gh/user/repo/branch/` address now answers with a redirect to
`http://`, which an https page blocks, so use the `@v18` form above.

Older tags are offline; only `v18` and `main` resolve.

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

The relay has to be `wss://`. The CDN links are https pages, and a browser
refuses to open a plain `ws://` socket from one, so such a relay fails before it
sends a byte. v18 promotes a pasted `ws://` address to `wss://` for you, but the
link the helper prints is already the right one.

The relay is passed in the link, not typed into Settings. Settings is for the
look of the app and shows what is saved on the device.

## What is in v18

- **Real browsing, not a reader**: every tab now runs Scramjet inside the app.
  The service worker (`sw.js`) and the transport worker (`bmworker.js`) sit next
  to the app on the same CDN host, fetch the page through your Wisp relay and
  rewrite it the way a proxy browser does. TikTok, Instagram, Discord, Google
  and Wikipedia render their real pages, scripts and video feeds.
- **Nothing to block by name**: proxied addresses are base64url, so the path
  never contains `tiktok.com` or `youtube.com`. A filter sees one host: the CDN
  the app already came from.
- **Relay that actually connects**: a `ws://` relay pasted on an https page is
  promoted to `wss://` instead of silently failing as mixed content, and the
  page frame is granted fullscreen, autoplay, encrypted media and clipboard so
  sites behave like they do in a real tab.
- **The old pipeline is still the safety net**: if a browser cannot run the
  worker (private mode, worker blocked, an old Chrome), tabs fall back to the
  existing fetched reader view instead of dying.
- **Games that cannot fail**: 2048, Snake and Breakout ship inside the app and
  sit at the front of the shelf with an `offline` badge. They need no network at
  all, so the Games tab always has something playable.
- **Games that used to half-load**: the wrapper is taken from gn-math's live
  copy, whose asset hosts still work, and the app maps the catalogue's plain
  name (`205.html`) back to the published one (`205-fix2.html`). A wrapper that
  points its `<base>` at `index.html` has that fixed, and a base on raw GitHub
  is rewritten to jsDelivr, so the game's own scripts load instead of a block
  page.
- **Saleen logo**: a flat violet squircle with a single white S, drawn inline in
  the SVG build (no extra file to fetch), plus a neutral school-blue document
  favicon. The toolbar's back, forward and reload buttons are inline icons too,
  so they render on a machine with no symbol font.
- **The right film, not a neighbour**: a mirror does not always hold the title
  its row claims. The player asks the catalogue for the real runtime and skips
  any mirror whose playlist length is clearly a different movie, so a 93-minute
  film no longer opens a 109-minute one.
- **Long sessions stay smooth**: the level is capped to the player size, the
  buffer is bounded, and the blurred overlays go flat while the video is
  actually playing, which stops a weak Chromebook redrawing a full-width blur
  every frame for two hours.
- **Episodes stay fixed**: the 48s budget, three mirrors and per-mirror watchdog
  from v16 are unchanged, as are the segment prefetch and the ABR tweaks.
- **Harder to copy**: the shipped JavaScript is minified with mangled names,
  the right-click menu and the common source/devtools shortcuts are blocked, and
  the plain HTML build is not published. There is only the SVG app.
- **School-safe links**: the Links tab lists only the two CDN hosts schools
  normally allow. Raw GitHub, githack and the HTML file are gone.
- **Picks up where it stopped**: the player stores the position of the film or
  episode every few seconds. If the tab is closed by the browser or by a
  classroom policy, opening the same title again seeks back to that point and
  says so, instead of starting over.
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
- A few games in the catalogue are wrappers for a vendor runtime (YouTube
  Playables, Yandex Games, Poki). They need that vendor's SDK, so they can show
  their loading screen without ever starting. That is the game, not the mirror;
  2048, Snake and Breakout ship inside the app and always run.
- The school can still block the CDN host itself, and a self-hosted relay can
  be flagged. The codec keeps site names out of the address bar, but nothing can
  promise a network owner will not notice traffic.
- Closing a tab cannot be prevented. A page can ask for confirmation
  (`beforeunload`) when the person closes it, but a close issued by the browser
  or by classroom management software (Securly, GoGuardian, Lightspeed) is not
  something page JavaScript is allowed to see or refuse. What the app does
  instead is remember the playback position, so reopening the title continues
  from the same minute.

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

Because mirrors are shared between titles, one can hold a different film. The
catalogue's own runtime is fetched alongside the probe and a mirror whose
playlist length is clearly not that runtime is skipped without using up one of
the three tries, so the correct source still gets its turn.

## Files

- `saleen.svg` / `period3.svg` - the app as a standalone SVG document.
- `class.svg` - the classroom disguise page.
- `sw.js` - the page worker (Scramjet service worker).
- `bmworker.js` - the bare-mux transport worker.
- `wisp-server/` - the private relay, start scripts and deploy configs.

## Updating

Pinned links (`@v18`) never change. `@main` can take up to 12 hours at the edge.
Purge a file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@v18/period3.svg`
