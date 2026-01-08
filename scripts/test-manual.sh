#!/bin/bash
# Script de Teste Manual para Linux/Mac
# Facilita a execução de testes manuais do SetAI CLI

MODE=${1:-basic}
LANG=${2:-pt-BR}
ADVANCED=""
BETA=""
CLEAN=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --advanced)
            ADVANCED="--advanced"
            shift
            ;;
        --beta)
            BETA="--beta"
            shift
            ;;
        --clean)
            CLEAN=true
            shift
            ;;
        --lang)
            LANG="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

echo "🧪 SetAI CLI - Teste Manual"
echo ""

# Diretório de teste
TEST_DIR="test-manual"

# Limpar diretório se solicitado
if [ "$CLEAN" = true ] || [ ! -d "$TEST_DIR" ]; then
    echo "🧹 Limpando diretório de teste..."
    rm -rf "$TEST_DIR"
    mkdir -p "$TEST_DIR"
    echo "✅ Diretório limpo criado: $TEST_DIR"
fi

# Build do projeto
echo "🔨 Fazendo build do projeto..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Build falhou!"
    exit 1
fi

echo "✅ Build concluído!"
echo ""

# Navegar para diretório de teste
cd "$TEST_DIR" || exit

# Construir comando
CMD="node ../dist/index.js init"

if [ -n "$ADVANCED" ]; then
    CMD="$CMD $ADVANCED"
fi

if [ -n "$BETA" ]; then
    CMD="$CMD $BETA"
fi

if [ "$LANG" != "pt-BR" ]; then
    CMD="$CMD --lang $LANG"
fi

echo "🚀 Executando: $CMD"
echo ""
echo "📝 Responda as perguntas interativamente"
echo ""

# Executar comando
eval $CMD

# Voltar para diretório raiz
cd ..

echo ""
echo "✅ Teste concluído!"
echo "📁 Verifique os arquivos gerados em: $TEST_DIR"
