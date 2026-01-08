# Script de teste automatizado para Windows PowerShell
# Simula respostas do usuário para testar o CLI

Write-Host "🧪 Testando SetAI CLI..." -ForegroundColor Cyan

# Criar diretório de teste
$testDir = "test-cli-output"
if (Test-Path $testDir) {
    Remove-Item -Path $testDir -Recurse -Force
}
New-Item -ItemType Directory -Path $testDir | Out-Null

Write-Host "📁 Diretório de teste criado: $testDir" -ForegroundColor Green

# Build do projeto
Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build falhou!" -ForegroundColor Red
    exit 1
}

# Executar CLI com respostas simuladas
Write-Host "🚀 Executando CLI..." -ForegroundColor Yellow
Set-Location $testDir

# Simula respostas: nome, language, framework, database, useTDD, strictMode
$responses = @(
    "test-project",
    "1",  # TypeScript
    "1",  # Next.js
    "1",  # PostgreSQL
    "y",  # TDD sim
    "y"   # Strict mode sim
)

# Executar CLI (nota: precisa de input interativo, este é apenas um exemplo)
Write-Host "⚠️  Para testar manualmente, execute:" -ForegroundColor Yellow
Write-Host "   cd $testDir" -ForegroundColor White
Write-Host "   node ../dist/index.js init" -ForegroundColor White
Write-Host ""
Write-Host "E responda as perguntas interativamente." -ForegroundColor Gray

Set-Location ..

Write-Host "✅ Script concluído. Execute o CLI manualmente no diretório $testDir" -ForegroundColor Green

