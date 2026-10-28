# Saleen

A tiny browser in one file: transparent rail, live animated background, an AI chat with free keyless replies, and a customizer for emoji, name, accent, wallpaper and search engine.

## Links

- CDN (jsDelivr): https://cdn.jsdelivr.net/gh/blunts294/saleen@main/index.xhtml
- Website (GitHub Pages): https://blunts294.github.io/saleen/
- Source: index.html

## Files

- `index.html` - the app, for normal hosting and local use.
- `index.xhtml` - identical app as XML-valid XHTML. jsDelivr serves `.html` as plain text, but serves `.xhtml` as `application/xhtml+xml`, so this is the file that actually runs from the CDN.

## Updating

jsDelivr caches `@main` for 12 hours at the edge and up to 7 days in a browser. For instant updates, tag a release and use the tag:

`https://cdn.jsdelivr.net/gh/blunts294/saleen@v2/index.xhtml`