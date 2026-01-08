# Script de Teste Manual para Windows PowerShell
# Facilita a execução de testes manuais do SetAI CLI

param(
    [string]$Mode = "basic",
    [string]$Lang = "pt-BR",
    [switch]$Advanced,
    [switch]$Beta,
    [switch]$Clean
)

Write-Host "🧪 SetAI CLI - Teste Manual" -ForegroundColor Cyan
Write-Host ""

# Diretório de teste
$testDir = "test-manual"

# Limpar diretório se solicitado
if ($Clean -or -not (Test-Path $testDir)) {
    Write-Host "🧹 Limpando diretório de teste..." -ForegroundColor Yellow
    if (Test-Path $testDir) {
        Remove-Item -Path $testDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $testDir | Out-Null
    Write-Host "✅ Diretório limpo criado: $testDir" -ForegroundColor Green
}

# Build do projeto
Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build falhou!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build concluído!" -ForegroundColor Green
Write-Host ""

# Navegar para diretório de teste
Set-Location $testDir

# Construir comando
$command = "node ../dist/index.js init"

if ($Advanced) {
    $command += " --advanced"
}

if ($Beta) {
    $command += " --beta"
}

if ($Lang -ne "pt-BR") {
    $command += " --lang $Lang"
}

Write-Host "🚀 Executando: $command" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Responda as perguntas interativamente" -ForegroundColor Yellow
Write-Host ""

# Executar comando
Invoke-Expression $command

# Voltar para diretório raiz
Set-Location ..

Write-Host ""
Write-Host "✅ Teste concluído!" -ForegroundColor Green
Write-Host "📁 Verifique os arquivos gerados em: $testDir" -ForegroundColor Cyan
