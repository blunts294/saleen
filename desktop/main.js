const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const TEST = process.env.SALEEN_TEST === '1';
const TEST_URL = process.env.SALEEN_TEST_URL || 'https://www.google.com/search?q=electron';
const TEST_SHOT = process.env.SALEEN_TEST_SHOT || path.join(__dirname, 'shot.png');

/*
 * A web page cannot remove X-Frame-Options or CSP frame-ancestors; the browser
 * enforces them before any page script runs. Electron lets the embedding app
 * rewrite response headers, so every site can render in Saleen's iframe.
 */
function withoutFrameBlocks(details) {
  const headers = details.responseHeaders || {};
  const out = {};
  Object.keys(headers).forEach(function (key) {
    const lower = key.toLowerCase();
    if (lower === 'x-frame-options') return;
    if (lower === 'content-security-policy' || lower === 'content-security-policy-report-only') {
      const cleaned = (headers[key] || []).map(function (value) {
        return String(value).split(';').filter(function (part) {
          return !/^\s*frame-ancestors\b/i.test(part);
        }).join(';').trim();
      }).filter(function (value) {
        return value && value !== ';';
      });
      if (cleaned.length) out[key] = cleaned;
      return;
    }
    out[key] = headers[key];
  });
  return { responseHeaders: out };
}

app.whenReady().then(function () {
  session.defaultSession.webRequest.onHeadersReceived({ urls: ['*://*/*'] }, function (details, callback) {
    callback(withoutFrameBlocks(details));
  });

  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 860,
    minHeight: 560,
    backgroundColor: '#070a12',
    title: 'Saleen',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: false
    }
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, '..', 'index.html'));

  win.webContents.setWindowOpenHandler(function (info) {
    shell.openExternal(info.url);
    return { action: 'deny' };
  });

  win.webContents.on('did-finish-load', function () {
    if (!TEST) return;
    win.webContents.executeJavaScript(
      '(() => { const i = document.getElementById("omni"); i.value = ' +
        JSON.stringify(TEST_URL) +
        '; document.getElementById("omniForm").requestSubmit(); return true; })()'
    ).catch(function () {});

    setTimeout(function () {
      win.webContents.capturePage().then(function (image) {
        fs.writeFileSync(TEST_SHOT, image.toPNG());
        app.quit();
      }).catch(function () { app.quit(); });
    }, 8000);
  });
});

app.on('window-all-closed', function () {
  app.quit();
});
