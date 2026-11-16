# Saleen

A one-file, ad-free movie/TV/games front end with a classroom disguise. The
interface is plain HTML/CSS/JS; the player is native (HLS) and the only optional
external piece is the Wisp relay used to reach stream hosts.

## Links (v15)

Every link below serves the same build. If one host is blocked at school, try
the next.

**App (neutral filename `period3.svg`)**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v15/period3.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v15/period3.svg

**Class disguise page**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v15/class.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v15/class.svg

Older tags are offline; only `v15` and `main` resolve.

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

## What is in v15

- **Smoother first minute for episodes**: the three opening segments download while the player is being built, so a slow stream host no longer causes a gap at the ten second mark.
- **Episodes no longer dead-end**: some stream hosts refuse the relay (TLS or blocklisted), which is exactly what made one show say This episode did not load while everything else played. The player now races the relay against the page itself on the first request to a host, remembers the transport that worked, and falls back for the rest, so a host that rejects the relay still plays.
- **No more typing stutter while a page builds**: the page rewriter hands the main thread back between node batches instead of rewriting a whole page in one long block, so the caret and the typing animation keep moving while a heavy page loads.

- **Episodes fixed for good**: the player now stops after a handful of mirrors
  instead of bouncing between them, and a slow episode is given up to 26s per
  segment and 55s total before it shows **Try again**. That removes the endless
  "loading loop" on TV shows.
- **Lighter, faster tab**: video is unpacked in a background worker so the page
  stays responsive while a film plays, the wallpaper runs at 20fps, off-screen
  cards skip layout and paint, and films start on the lightest quality then step
  up, which is what stops the first-minute stutter on a weak laptop.
- **Honest buffering**: the progress line counts the seconds it has waited, so a
  slow relay is visibly working instead of looking frozen.
- **Faster browsing**: a page now asks the relay and every proxy at once instead
  of waiting on the relay first, pages that loaded before reopen instantly, and
  the last dozen are kept in memory.
- **Harder to copy**: the shipped JavaScript is minified with mangled names,
  the right-click menu and the common source/devtools shortcuts are blocked, and
  the plain HTML build is no longer published. There is only the SVG app.
- **School-safe links**: the Links tab lists only the two CDN hosts schools
  normally allow. Raw GitHub, githack and the HTML file are gone.
- **Smooth playback**: every mirror's playlist is probed in parallel and only
  the winning mirror downloads its first segment, so the relay is not
  saturated before playback starts. hls.js starts on automatic quality and
  steps down instead of restarting when a segment is slow.
- **TV episodes**: manifests without an end marker are played as VOD from the
  start, and English audio groups are detected even when unlabelled.
- **Saved progress**: game saves live in the app's own storage, keyed per game,
  so closing the site and coming back keeps your progress. A **Continue** button
  opens the last game you played.
- **Settings cleaned up**: the Wisp relay field is gone. Settings now has a
  wallpaper toggle and accent colours, and a note about saved data.
- **Faster games**: all five mirrors are raced instead of tried one by one;
  HTML for the last 12 games is kept in memory, so reopening a game is instant.
- Catalogue chips: trending, popular, top rated and anime, plus Netflix, Prime,
  Disney+, Max, Hulu, Apple TV+, Paramount+ and Peacock filters.
- **Pinned picks**: 47 films and 35 shows, including Blood and Bone, Never Back
  Down, White Chicks and The Flash (2014, 9 seasons).
- **Games**: 850 playable HTML games, bundled so the grid paints instantly.
- **No music tab.** The dock has Home, AI, Links, Games, Movies, TV, Settings.

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
- `wisp-server/` - the private relay, start scripts and deploy configs.

## Updating

Pinned links (`@v15`) never change. `@main` can take up to 12 hours at the edge.
Purge a file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@v15/period3.svg`
