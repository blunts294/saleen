# Saleen

A one-file, ad-free movie/TV/games front end with a classroom disguise. The
interface is plain HTML/CSS/JS; the player is native (HLS) and the only optional
external piece is the Wisp relay used to reach stream hosts.

## Links (v6)

- **App, neutral filename:** https://cdn.jsdelivr.net/gh/blunts294/saleen@v6/period3.svg
- App, original name: https://cdn.jsdelivr.net/gh/blunts294/saleen@v6/saleen.svg
- **Class disguise page:** https://cdn.jsdelivr.net/gh/blunts294/saleen@v6/class.svg
- Plain HTML build: https://cdn.jsdelivr.net/gh/blunts294/saleen@v6/index.html
- Source: `index.html`

Use the `period3.svg` link when the tab name or URL should not give the app
away. The page title is always `Biology 3 - Period 3`.

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

## What is in v6

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
the page, and plays the first one that delivers a real video fragment through
your relay. Every non-English mirror is dropped before the player is built, so
there is nothing to switch to and no language panel to leak. Dead mirrors get a
second pass before the title is marked unavailable.

## Files

- `saleen.svg` / `period3.svg` - the app as a standalone SVG document.
- `class.svg` - the classroom disguise page.
- `index.html` - the same app for normal hosting.
- `wisp-server/` - the private relay, start scripts and deploy configs.

## Updating

Pinned links (`@v6` or a commit SHA) never change. `@main` can take up to 12
hours at the edge. Purge a file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@main/period3.svg`
