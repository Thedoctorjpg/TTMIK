# Run full Melbourne Lantern / TTMIK local stack
$Root = Split-Path -Parent $PSScriptRoot

function Start-DevJob {
    param([string]$Name, [string]$Dir, [string]$Command)
    Write-Host "Starting $Name..."
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd /d `"$Dir`" && $Command" -WindowStyle Minimized
}

Start-DevJob "shopify-twitter :3000" "$Root\shopify-twitter" "npm.cmd start"
Start-DevJob "ttmik-tweet :5174" "$Root\ttmik-tweet" "npm.cmd run dev"
Start-DevJob "lets-cook :5173" "$Root\lets-cook" "npm.cmd run dev"
Start-DevJob "girls-love :5190" "$Root\girls-love" "npx.cmd --yes serve -l 5190"
Start-DevJob "Creative Corner :5180" "$Root\creative-corner-twitter" "python -m http.server 5180"
Start-DevJob "Veil-Lumen :5181" "$Root\Veil-Lumen" "node scripts/cli.mjs dev veil-lumen --port 5181"
Start-DevJob "video-editor :8000" "$Root\video-editor" "python -m http.server 8000"
Start-DevJob "TTMIK :8080" $Root "python -m http.server 8080"

Start-Sleep -Seconds 4
Write-Host ""
Write-Host "Local stack URLs:"
Write-Host "  TTMIK main       http://localhost:8080/TTMIK.html"
Write-Host "  TTMIK Tweet      http://localhost:5174/"
Write-Host "  shopify-twitter  http://localhost:3000/health"
Write-Host "  lets-cook        http://localhost:5173/date-night"
Write-Host "  girls-love       http://localhost:5190/"
Write-Host "  Creative Corner  http://localhost:5180/"
Write-Host "  Veil-Lumen       http://localhost:5181/"
Write-Host "  video-editor     http://localhost:8000/"