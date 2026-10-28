# Saleen

A browser in one file: transparent rail, live animated background, an AI chat with
free keyless replies, and a customizer for emoji, name, accent, wallpaper and
search engine. Typed URLs and searches open inside the app window.

## Links

- Pinned release: https://cdn.jsdelivr.net/gh/blunts294/saleen@5/index.xhtml
- Latest: https://cdn.jsdelivr.net/gh/blunts294/saleen@main/index.xhtml
- Website (GitHub Pages): https://blunts294.github.io/saleen/
- Source: `index.html`

## In-app browsing

Saleen never opens a second window for a search. The omni bar and the home field
load the result page in the frame under the toolbar, and back/forward follow the
in-app history.

Bing is the default engine because its results page is the only major engine that
still allows framing. Google and DuckDuckGo send `X-Frame-Options`, so choosing
them opens a normal tab instead.

Some sites refuse to be framed at all. They send `X-Frame-Options` or
`Content-Security-Policy: frame-ancestors`, and the browser enforces that before
any page code runs, so no script inside a page can override it. Saleen deals with
that in three layers:

1. **Known blockers open in Reader automatically.** Around a hundred hosts
   (Google, YouTube, GitHub, Reddit, X, Instagram, BBC, CNN, Netflix, Amazon
   search, banks, stores, game stores and so on) were checked against their live
   headers and are listed in `READER_BLOCK`.
2. **Every page has a Reader / Page toggle** in the strip above the frame, so any
   other site can be switched manually.
3. **The reader tries several services in order** until one returns text:
   `r.jina.ai`, then the same URL with `www.` (some domains are only blocked bare),
   then `allorigins` and `codetabs` in parallel, then Microlink's renderer. Links
   inside the text view stay in Saleen, and a failed load offers *Try again* and
   *Show the page*.

Reader mode shows the article text, not the original layout. That is the honest
limit of a web page: full layout for a blocking site needs a shell that owns the
network stack.

## Desktop shell (full rendering)

`desktop/` is an Electron wrapper that deletes `X-Frame-Options` and
`frame-ancestors` from every response, so blocked sites render normally instead of
as text. It needs Node 18+ and about 350 MB of disk for Electron:

```powershell
cd desktop
npm install
npm start
```

## Files

- `index.html` - the app, for normal hosting and local use.
- `index.xhtml` - the same app as XML-valid XHTML. jsDelivr serves `.html` as
  plain text, but serves `.xhtml` as `application/xhtml+xml`, so this is the file
  that actually runs from the CDN.
- `desktop/` - optional Electron shell.
- `.nojekyll` - stops GitHub Pages from running the page through Jekyll.

## Updating

jsDelivr caches `@main` for 12 hours at the edge and up to 7 days in a browser, and
a purge does not always reach every POP immediately. Tag a release for an instant,
immutable link (drop the leading `v`):

`https://cdn.jsdelivr.net/gh/blunts294/saleen@6/index.xhtml`

Purge a stale file with `https://purge.jsdelivr.net/gh/blunts294/saleen@main/index.xhtml`.