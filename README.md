# Saleen

A tiny browser in one file: transparent rail, live animated background, an AI chat with free keyless replies, and a customizer for emoji, name, accent, wallpaper and search engine. Searches and typed URLs load inside the app window.

## Links

- Pinned CDN: https://cdn.jsdelivr.net/gh/blunts294/saleen@3/index.xhtml
- Latest CDN: https://cdn.jsdelivr.net/gh/blunts294/saleen@main/index.xhtml
- Website (GitHub Pages): https://blunts294.github.io/saleen/
- Source: index.html

## In-app browsing

Typed URLs open in an iframe inside Saleen, and Bing (the default) allows framing, so searches render in the app.

Some sites refuse to be framed at all. They send `X-Frame-Options` or `Content-Security-Policy: frame-ancestors`, and the browser enforces that before any page code runs, so no script can override it. Saleen handles this two ways:

- Known blockers (Google, YouTube, GitHub, Reddit, X, and others) open in **Reader** automatically: the page text is fetched through r.jina.ai and rendered inside the app with clickable links that keep browsing in Saleen.
- Every other page has a **Reader / Page** toggle in the strip above the frame, plus "Open in a new tab".

Reader shows text, not the original layout. For a browser that renders absolutely everything, the page needs to be wrapped in a desktop shell (Electron/Tauri with a real webview) instead of iframed in a web page.

## Files

- `index.html` - the app, for normal hosting and local use.
- `index.xhtml` - the same app as XML-valid XHTML. jsDelivr serves `.html` as plain text, but serves `.xhtml` as `application/xhtml+xml`, so this is the file that runs from the CDN.
- `.nojekyll` - stops GitHub Pages from running the HTML through Jekyll.

## Updating

jsDelivr caches `@main` for 12 hours at the edge and up to 7 days in a browser, and a purge does not always reach every POP immediately. Tag a release for an instant, immutable link (drop the leading `v`):

`https://cdn.jsdelivr.net/gh/blunts294/saleen@4/index.xhtml`

Purge a stale file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@main/index.xhtml`