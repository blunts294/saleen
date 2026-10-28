# Saleen Desktop

The web version of Saleen can show **text** for sites that refuse to be framed.
This shell removes that limit: it is Electron, so the app itself owns the network
stack and can delete `X-Frame-Options` and `frame-ancestors` from every response.
Pages that block the website render normally here.

## Run it

```powershell
cd desktop
npm install
npm start
```

`npm install` downloads Electron (~120 MB download, ~350 MB on disk), so it needs
free space and Node.js 18+. Nothing else is required: the app loads
`../index.html`, so edit that file and restart to see changes.

## What it does

- `session.defaultSession.webRequest.onHeadersReceived` strips
  `x-frame-options` and the `frame-ancestors` directive from CSP for every
  request, before the renderer sees it.
- The window is a normal browser window: one Saleen page, its own iframe for
  sites, external links open in the system browser.
- Context isolation stays on, Node stays off in the page.

## Test without clicking

```powershell
$env:SALEEN_TEST="1"
$env:SALEEN_TEST_URL="https://www.google.com/search?q=saleen"
$env:SALEEN_TEST_SHOT="$PWD\shot.png"
npm start
```

It loads the URL, waits 8 seconds, writes a PNG and quits.
