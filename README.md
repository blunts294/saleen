# Saleen

A one-file, ad-free movie/TV/games front end with a classroom disguise. The
interface is plain HTML/CSS/JS; the only external piece is the player and the
optional Wisp relay for the web tab.

## Links (v4)

- **App, neutral filename:** https://cdn.jsdelivr.net/gh/blunts294/saleen@v4/period3.svg
- App, original name: https://cdn.jsdelivr.net/gh/blunts294/saleen@v4/saleen.svg
- **Class disguise page:** https://cdn.jsdelivr.net/gh/blunts294/saleen@v4/class.svg
- Plain HTML build: https://cdn.jsdelivr.net/gh/blunts294/saleen@v4/index.html
- Source: `index.html`

Use the `period3.svg` link when the tab name or URL should not give the app
away. The page title is always `Biology 3 - Period 3`.

## What is in v4

- **Movies + TV**: one English source only, labelled `English`. Trending,
  popular, top rated and anime chips, plus Netflix, Prime, Disney+, Max, Hulu,
  Apple TV+, Paramount+ and Peacock filters that return their own catalogues.
- **Pinned picks**: 47 films and 35 shows, including Blood and Bone, Never Back
  Down, White Chicks and The Flash (2014, 9 seasons).
- **Games**: 850 playable HTML games, bundled so the grid paints instantly, with
  cover art from the GN Math cover CDN.
- **Settings**: a Wisp relay field. Leave it empty to use the public relay.
- **No music tab.** The bottom dock has Home, AI, Links, Games, Movies, TV,
  Settings.

## Classroom disguise

- The tab title is `Biology 3 - Period 3`.
- Press `Esc` or `` ` `` to swap the whole app for a fake Biology class call;
  press again to come back.
- A 30x30 invisible button in the top-right corner does the same when a player
  iframe has keyboard focus.
- `class.svg` is a standalone, convincing class call. Nothing on it mentions
  Saleen. To open the app from it, type `saleen` or press `\`. There is no
  visible button or hint.

## Wisp server (web tab)

`wisp-server/` is a private [Wisp](https://github.com/MercuryWorkshop/wisp-protocol)
relay. Run it locally:

```bash
cd wisp-server
npm install
npm start
# health check: http://localhost:5001/healthz
```

Deploy it anywhere that keeps a Node process and supports WebSockets (Render,
Fly.io, Railway, a VPS). Then paste the `wss://...` address into **Settings ->
Wisp relay** and press **Save relay**. The app tries your relay first and keeps
the public relay only as a fallback.

Render reads `render.yaml`; Fly reads `fly.toml`; a `Dockerfile` is included.
Free hosts may sleep when idle, so the first load after a break can take a few
seconds.

## Playback

Playback uses CinemaOS's own watch page in an iframe with `?lang=en`, so the
player stays inside Saleen and only the English track is requested. CinemaOS
allows embedding (`X-Frame-Options: ALLOWALL`). Its cross-origin player UI cannot
be edited from Saleen, which is why Saleen exposes a single `English` source chip
instead of language or server switching.

## Files

- `saleen.svg` / `period3.svg` - the app as a standalone SVG document.
- `class.svg` - the classroom disguise page.
- `index.html` - the same app for normal hosting.
- `index.xhtml` - XML-valid copy used by older releases.
- `wisp-server/` - the private relay.

## Updating

Pinned links (`@v4` or a commit SHA) never change. `@main` can take up to 12
hours at the edge. Purge a file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@main/period3.svg`
