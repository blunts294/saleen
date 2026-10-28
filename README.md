# Saleen

A tiny browser in one file: transparent rail, live animated background, an AI chat with free keyless replies, and a customizer for emoji, name, accent, wallpaper and search engine. Searches and typed URLs load inside the app window.

## Links

- Pinned CDN: https://cdn.jsdelivr.net/gh/blunts294/saleen@2/index.xhtml
- Latest CDN: https://cdn.jsdelivr.net/gh/blunts294/saleen@main/index.xhtml
- Website (GitHub Pages): https://blunts294.github.io/saleen/
- Source: index.html

## In-app browsing

The web view is an iframe, so it can only show sites that allow framing. Google and DuckDuckGo send `X-Frame-Options: SAMEORIGIN`, so they are kept as "opens a tab" engines. Bing allows framing and is the default, so searches render inside Saleen.

If a page stays blank, the site refused to be embedded: use the "Open in a new tab" link in the strip above it.

## Files

- `index.html` - the app, for normal hosting and local use.
- `index.xhtml` - the same app as XML-valid XHTML. jsDelivr serves `.html` as plain text, but serves `.xhtml` as `application/xhtml+xml`, so this is the file that runs from the CDN.
- `.nojekyll` - stops GitHub Pages from running the HTML through Jekyll.

## Updating

jsDelivr caches `@main` for 12 hours at the edge and up to 7 days in a browser. For an instant, immutable link, tag a release and drop the leading `v` in the URL:

`https://cdn.jsdelivr.net/gh/blunts294/saleen@3/index.xhtml`

Purge a stale file with:

`https://purge.jsdelivr.net/gh/blunts294/saleen@main/index.xhtml`