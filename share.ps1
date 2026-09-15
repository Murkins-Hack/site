[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "MURK1INSHOPSPORTFOLIO — РАЗДАЧА САЙТА"

Write-Host ""
Write-Host " ====================================================================" -ForegroundColor Cyan
Write-Host "       MURK1INSHOPSPORTFOLIO // АВТОМАТИЧЕСКАЯ РАЗДАЧА САЙТА          " -ForegroundColor White
Write-Host " ====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " [1/3] Запуск локального сервера магазина (порт 5173)..." -ForegroundColor Yellow

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $projectDir) { $projectDir = Get-Location }
Set-Location $projectDir

# Запуск Vite в фоновом процессе (порт 5173)
$viteProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173" -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 3

# Получаем локальный IP в домашней сети
$localIp = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi*', 'Ethernet*' -ErrorAction SilentlyContinue | Select-Object -First 1).IPAddress
if (-not $localIp) { $localIp = "127.0.0.1" }

Write-Host " [2/3] Подключение изолированного Cloudflare-туннеля..." -ForegroundColor Yellow
$logFile = Join-Path $projectDir "cf_tunnel_session.log"
if (Test-Path $logFile) { Remove-Item $logFile -Force }

# Запуск Cloudflare Tunnel с изолированным портом метрик 20248 (не трогает бота на 8000/20241)
$cfProcess = Start-Process -FilePath "cloudflared.exe" -ArgumentList "tunnel", "--no-autoupdate", "--metrics", "127.0.0.1:20248", "--url", "http://127.0.0.1:5173", "--logfile", "`"$logFile`"" -PassThru -WindowStyle Hidden

Write-Host " [3/3] Ожидание генерации ссылки..." -ForegroundColor Yellow

$publicUrl = ""
$timeout = 35
$elapsed = 0
while ($elapsed -lt $timeout) {
    Start-Sleep -Milliseconds 800
    $elapsed++
    if (Test-Path $logFile) {
        $found = Select-String -Path $logFile -Pattern "https://[a-zA-Z0-9-]+\.trycloudflare\.com"
        if ($found) {
            $publicUrl = $found[0].Matches[0].Value
            break
        }
    }
}

Clear-Host
Write-Host ""
Write-Host " ====================================================================" -ForegroundColor Cyan
Write-Host "       ✦ MURK1INSHOPSPORTFOLIO — САЙТ УСПЕШНО РАЗДАЕТСЯ ОНЛАЙН! ✦    " -ForegroundColor Green
Write-Host " ====================================================================" -ForegroundColor Cyan
Write-Host ""

if ($publicUrl) {
    try { Set-Clipboard -Value $publicUrl } catch {}

    Write-Host " 🌐 ПУБЛИЧНАЯ ССЫЛКА ДЛЯ ДРУГА (ЧЕРЕЗ ИНТЕРНЕТ):" -ForegroundColor White
    Write-Host ""
    Write-Host "    $publicUrl" -ForegroundColor Black -BackgroundColor Cyan
    Write-Host ""
    Write-Host "    ✓ Ссылка АВТОМАТИЧЕСКИ скопирована в буфер обмена!" -ForegroundColor Green
    Write-Host "    ✓ Просто нажмите Ctrl+V в Telegram/Discord и отправьте другу." -ForegroundColor Gray
    Write-Host "    ✓ Друг откроет магазин с телефона или ПК без паролей и проверок." -ForegroundColor Gray
} else {
    Write-Host " [!] Ссылка генерируется дольше обычного. Проверьте: $logFile" -ForegroundColor Red
}

Write-Host ""
Write-Host " --------------------------------------------------------------------" -ForegroundColor DarkGray
Write-Host " 📱 Ссылка для устройств в одной Wi-Fi сети: http://$($localIp):5173/" -ForegroundColor Yellow
Write-Host " 💻 Локальный адрес на вашем компьютере:    http://localhost:5173/" -ForegroundColor Gray
Write-Host " 🤖 Ваш второй бот:                         РАБОТАЕТ БЕЗ ИЗМЕНЕНИЙ" -ForegroundColor Green
Write-Host " --------------------------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""
Write-Host " ⚠️  НЕ ЗАКРЫВАЙТЕ ЭТО ОКНО, пока друг смотрит сайт." -ForegroundColor Yellow
Write-Host " Чтобы остановить раздачу магазина, нажмите Enter или закройте окно..." -ForegroundColor Gray
Write-Host ""

try {
    $null = [Console]::ReadLine()
} finally {
    Write-Host " Остановка магазина..." -ForegroundColor DarkGray
    if ($cfProcess -and -not $cfProcess.HasExited) { Stop-Process -Id $cfProcess.Id -Force -ErrorAction SilentlyContinue }
    if ($viteProcess -and -not $viteProcess.HasExited) { Stop-Process -Id $viteProcess.Id -Force -ErrorAction SilentlyContinue }
}
