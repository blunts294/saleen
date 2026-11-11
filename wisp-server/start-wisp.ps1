# Saleen personal Wisp relay
#
# Starts the relay on this PC, opens a free Cloudflare quick tunnel so the
# browser can reach it over wss://, then prints a ready-to-open app link.
#
# Usage: double-click start-wisp.cmd  (or right-click this file > Run with PowerShell)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

# Pinned app build used in the printed link. Bump when a new tag ships.
$tag = 'v6'
$appBase = "https://cdn.jsdelivr.net/gh/blunts294/saleen@$tag/period3.svg"
$port = 5001
$toolDir = Join-Path $env:LOCALAPPDATA 'SaleenWisp'
$cf = Join-Path $toolDir 'cloudflared.exe'
$log = Join-Path $env:TEMP 'saleen-wisp-tunnel.log'
$out = Join-Path $env:TEMP 'saleen-wisp-tunnel.out'
$tunnel = $null
$relay = $null

function Say($text, $color = 'Gray') {
  Write-Host $text -ForegroundColor $color
}

try {
  Say ''
  Say '  Saleen relay' 'Magenta'
  Say '  -------------' 'DarkGray'

  $node = Get-Command node -ErrorAction SilentlyContinue
  if (-not $node) {
    Say '  Node.js is required. Install it from https://nodejs.org and run this again.' 'Red'
    Read-Host 'Press Enter to close'
    exit 1
  }

  if (-not (Test-Path (Join-Path $root 'node_modules\@mercuryworkshop\wisp-js'))) {
    Say '  Installing relay dependencies (one time)...' 'Yellow'
    & npm install --omit=dev --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'npm install failed' }
  }

  $already = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
  if (-not $already) {
    Say '  Starting the relay...' 'Yellow'
    $relay = Start-Process -FilePath $node.Source -ArgumentList 'server.mjs' -WorkingDirectory $root -WindowStyle Hidden -PassThru
  }

  $healthy = $false
  for ($i = 0; $i -lt 30; $i++) {
    try {
      $r = Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:$port/healthz" -TimeoutSec 2
      if ($r.StatusCode -eq 200) { $healthy = $true; break }
    } catch { }
    Start-Sleep -Milliseconds 400
  }
  if (-not $healthy) { throw 'relay did not answer on port ' + $port }

  if (-not (Test-Path $cf)) {
    New-Item -ItemType Directory -Force -Path $toolDir | Out-Null
    $arch = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') { 'arm64' } else { 'amd64' }
    $url = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-$arch.exe"
    Say '  Downloading the tunnel helper (one time, about 55 MB)...' 'Yellow'
    & curl.exe -L --fail --retry 2 -o $cf $url
    if ($LASTEXITCODE -ne 0) { throw 'cloudflared download failed' }
  }

  Remove-Item $log, $out -Force -ErrorAction SilentlyContinue
  Say '  Opening the tunnel...' 'Yellow'
  $tunnel = Start-Process -FilePath $cf -ArgumentList 'tunnel', '--no-autoupdate', '--url', "http://127.0.0.1:$port" -RedirectStandardError $log -RedirectStandardOutput $out -WindowStyle Hidden -PassThru

  $public = $null
  for ($i = 0; $i -lt 80; $i++) {
    Start-Sleep -Milliseconds 500
    if (Test-Path $log) {
      $hit = Select-String -Path $log -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($hit) { $public = $hit.Matches[0].Value; break }
    }
    if ($tunnel.HasExited) { break }
  }
  if (-not $public) { throw 'the tunnel did not come up; check ' + $log }

  $wss = $public -replace '^https:', 'wss:'
  $link = $appBase + '?wisp=' + [uri]::EscapeDataString($wss)

  Set-Content -Path (Join-Path $root 'last-link.txt') -Value $link -Encoding ASCII
  try { Set-Clipboard -Value $link } catch { }

  Say ''
  Say '  Relay is live' 'Green'
  Say ''
  Say '  Relay URL:'
  Say "    $wss" 'Cyan'
  Say ''
  Say '  Open this link (it saves the relay automatically):'
  Say "    $link" 'Cyan'
  Say ''
  Say '  The link is also in last-link.txt and on your clipboard.' 'DarkGray'
  Say '  Keep this window open while you watch. Press Ctrl+C to stop.' 'DarkGray'
  Say ''

  while ($true) {
    Start-Sleep -Seconds 30
    if ($tunnel.HasExited) {
      Say '  Tunnel closed. Run start-wisp.cmd again for a fresh link.' 'Red'
      break
    }
  }
}
catch {
  Say ''
  Say ('  ' + $_.Exception.Message) 'Red'
  Say '  See wisp-server/README.md for the manual steps.' 'DarkGray'
  Read-Host 'Press Enter to close'
}
finally {
  if ($tunnel -and -not $tunnel.HasExited) { Stop-Process -Id $tunnel.Id -Force -ErrorAction SilentlyContinue }
  if ($relay -and -not $relay.HasExited) { Stop-Process -Id $relay.Id -Force -ErrorAction SilentlyContinue }
}
