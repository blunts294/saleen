# Saleen

A one-file, ad-free movie/TV/games front end with a classroom disguise. The
interface is plain HTML/CSS/JS; the player is native (HLS) and the only optional
external piece is the Wisp relay used to reach stream hosts.

## Links (v8)

Every link below serves the same build. If one host is blocked at school, try
the next.

**App (neutral filename `period3.svg`)**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v8/period3.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v8/period3.svg
- raw.githack: https://raw.githack.com/blunts294/saleen/v8/period3.svg
- GitHub raw: https://raw.githubusercontent.com/blunts294/saleen/v8/period3.svg

**App (original name `saleen.svg`)**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v8/saleen.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v8/saleen.svg
- raw.githack: https://raw.githack.com/blunts294/saleen/v8/saleen.svg

**Class disguise page**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v8/class.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v8/class.svg
- raw.githack: https://raw.githack.com/blunts294/saleen/v8/class.svg

**Plain HTML build**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v8/saleen.html
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v8/saleen.html
- raw.githack: https://raw.githack.com/blunts294/saleen/v8/saleen.html

Older tags are offline; only `v8` and `main` resolve.

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

## What is in v8

- **Smooth playback**: every mirror's playlist is probed in parallel and only
  the winning mirror downloads its first segment, so the relay is not
  saturated before playback starts. hls.js starts on automatic quality, buffers
  up to two minutes, and tolerates slow segments instead of restarting.
- **TV episodes fixed**: manifests without an end marker are played as VOD from
  the start, English audio groups are detected even when unlabelled, and a 32s
  startup watchdog tries the next mirror instead of looping.
- **Saved progress**: game saves live in the app's own storage, keyed per game,
  so closing the site and coming back keeps your progress. A **Continue** button
  opens the last game you played.
- **Settings cleaned up**: the Wisp relay field is gone. Settings now has a
  wallpaper toggle and accent colours, and a note about saved data.
- **Links tab updated**: it lists every current v8 address, nothing older.
- **Faster games**: all five mirrors are raced instead of tried one by one;
  HTML for the last 12 games is kept in memory, so reopening a game is instant.
- **More CDNs**: hls.js loads from jsDelivr, unpkg or Statically, then the ESM
  build as a last resort. The relay's libcurl.js and wasm do the same.
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
- `saleen.html` - the same app for normal hosting.
- `wisp-server/` - the private relay, start scripts and deploy configs.

## Updating

Pinned links (`@v8`) never change. `@main` can take up to 12 hours at the edge.
Purge a file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@v8/period3.svg`
