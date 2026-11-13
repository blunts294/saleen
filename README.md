# Saleen

A one-file, ad-free movie/TV/games front end with a classroom disguise. The
interface is plain HTML/CSS/JS; the player is native (HLS) and the only optional
external piece is the Wisp relay used to reach stream hosts.

## Links (v7)

Every link below serves the same build. If one host is blocked at school, try
the next.

**App (neutral filename `period3.svg`)**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v7/period3.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v7/period3.svg
- raw.githack: https://raw.githack.com/blunts294/saleen/v7/period3.svg
- GitHub raw: https://raw.githubusercontent.com/blunts294/saleen/v7/period3.svg

**App (original name `saleen.svg`)**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v7/saleen.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v7/saleen.svg
- raw.githack: https://raw.githack.com/blunts294/saleen/v7/saleen.svg

**Class disguise page**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v7/class.svg
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v7/class.svg
- raw.githack: https://raw.githack.com/blunts294/saleen/v7/class.svg

**Plain HTML build**

- jsDelivr: https://cdn.jsdelivr.net/gh/blunts294/saleen@v7/saleen.html
- Statically: https://cdn.statically.io/gh/blunts294/saleen/v7/saleen.html
- raw.githack: https://raw.githack.com/blunts294/saleen/v7/saleen.html

Older tags are offline; only `v7` and `main` resolve.

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

## What is in v7

- **Faster players**: opening Movies or TV preloads hls.js and boots the relay
  before you tap a title. Every English mirror is probed at the same time and
  the fastest one wins, so a dead host no longer costs seconds. The winning
  playlist is reused instead of downloaded twice, resolved mirrors are cached
  for ten minutes, and timeouts dropped from 32s to 8-16s.
- **Faster games**: the five mirrors are raced instead of tried one by one;
  HTML for the last 12 games is kept in memory, so reopening a game is instant.
  Search filters on the next animation frame with a prebuilt card list, and a
  **Random** button starts something new in one tap.
- **More CDNs**: hls.js loads from jsDelivr, unpkg or Statically, then the ESM
  build as a last resort. The relay's libcurl.js and wasm do the same.
- **Movies + TV**: native English-only HLS playback. One `English` chip and no
  language or server list anywhere in the UI. If a title has no English stream,
  the player says so and offers **Try again** instead of opening a provider page
  that lists other languages.
- Catalogue chips: trending, popular, top rated and anime, plus Netflix, Prime,
  Disney+, Max, Hulu, Apple TV+, Paramount+ and Peacock filters.
- **Pinned picks**: 47 films and 35 shows, including Blood and Bone, Never Back
  Down, White Chicks and The Flash (2014, 9 seasons).
- **Games**: 850 playable HTML games, bundled so the grid paints instantly.
- **Settings**: Wisp relay field, pre-filled by the `?wisp=` link.
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

Pinned links (`@v7`) never change. `@main` can take up to 12 hours at the edge.
Purge a file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@v7/period3.svg`
