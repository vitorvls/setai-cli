# Business Rules

## Objetivo
Este arquivo documenta as regras de negócio do sistema. Estas regras devem ser seguidas em todas as implementações.

## Escopo
- Regras de negócio explícitas
- Validações obrigatórias
- Comportamentos esperados
- Casos de borda

---

## Regras Gerais

### Validação de Dados
- Todos os inputs do usuário devem ser validados antes de processar
- Validação deve ser clara e fornecer feedback imediato
- Inputs inválidos devem ser rejeitados com mensagem explicativa

### Tratamento de Erros
- Erros devem ser tratados graciosamente
- Mensagens de erro devem ser claras e acionáveis para o usuário
- Nunca exponha stack traces ou detalhes técnicos internos
- Sempre ofereça próximos passos quando possível

---

## Regras Específicas

### Geração de Estrutura

- **Regra 1: Detecção de estrutura existente**
  - **Quando:** Antes de gerar qualquer arquivo
  - **Validação:** Verificar se `.cursor/` já existe
  - **Comportamento:** Perguntar se deseja sobrescrever, mesclar ou cancelar
  - **Exceções:** Nenhuma - sempre perguntar antes de sobrescrever

- **Regra 2: Validação de diretório do projeto**
  - **Quando:** No início da execução
  - **Validação:** Verificar se está em diretório válido (pode ter package.json ou ser diretório vazio)
  - **Comportamento:** Avisar se não encontrar contexto, mas permitir continuar

- **Regra 3: Completude da estrutura**
  - **Quando:** Após coletar todas as informações
  - **Validação:** Garantir que todos os arquivos essenciais serão gerados
  - **Comportamento:** Gerar estrutura completa ou falhar claramente

### Fluxo de Perguntas

- **Regra 4: Ordem das perguntas**
  - **Quando:** Durante coleta de informações
  - **Validação:** Perguntas devem seguir ordem lógica (projeto → stack → regras)
  - **Comportamento:** 
    1. Informações básicas do projeto
    2. Stack tecnológica
    3. Regras e preferências
    4. Confirmação final

- **Regra 5: Perguntas opcionais vs obrigatórias**
  - **Quando:** Durante coleta de informações
  - **Validação:** Identificar quais informações são essenciais
  - **Comportamento:** 
    - Obrigatórias: Nome do projeto, stack básica
    - Opcionais: Detalhes específicos, regras customizadas

- **Regra 6: Valores padrão**
  - **Quando:** Para perguntas com opções
  - **Validação:** Ter valores padrão sensatos
  - **Comportamento:** Usar valores padrão baseados em melhores práticas quando possível

### Geração de Arquivos

- **Regra 7: Preservação de arquivos existentes**
  - **Quando:** Ao gerar arquivos
  - **Validação:** Verificar se arquivo já existe
  - **Comportamento:** Nunca sobrescrever sem confirmação explícita

- **Regra 8: Estrutura de diretórios**
  - **Quando:** Ao criar estrutura
  - **Validação:** Criar todos os diretórios necessários antes de arquivos
  - **Comportamento:** Criar `.cursor/` e subdiretórios recursivamente

- **Regra 9: Encoding de arquivos**
  - **Quando:** Ao escrever arquivos
  - **Validação:** Usar UTF-8 para todos os arquivos
  - **Comportamento:** Garantir compatibilidade cross-platform

---

## Casos de Borda

### Caso 1: Diretório não vazio sem .cursor
- **Situação:** Usuário executa CLI em projeto existente sem `.cursor/`
- **Comportamento esperado:** CLI deve funcionar normalmente, criar `.cursor/` na raiz
- **Tratamento:** Não requer ação especial, apenas criar estrutura

### Caso 2: .cursor parcialmente existente
- **Situação:** Alguns arquivos `.cursor/` já existem, outros não
- **Comportamento esperado:** Perguntar se deseja completar estrutura ou sobrescrever tudo
- **Tratamento:** Oferecer opções: completar, sobrescrever, ou cancelar

### Caso 3: Sem permissão de escrita
- **Situação:** Usuário não tem permissão para criar arquivos no diretório
- **Comportamento esperado:** Falhar com mensagem clara sobre permissões
- **Tratamento:** Validar permissões antes de começar, falhar cedo se não tiver

### Caso 4: Diretório não existe
- **Situação:** Usuário especifica diretório que não existe
- **Comportamento esperado:** Perguntar se deseja criar ou usar diretório atual
- **Tratamento:** Validar existência, oferecer criar ou usar alternativo

### Caso 5: Cancelamento pelo usuário
- **Situação:** Usuário cancela durante o fluxo (Ctrl+C ou "cancel")
- **Comportamento esperado:** Não criar nenhum arquivo, sair graciosamente
- **Tratamento:** Capturar sinais de cancelamento, limpar estado, não deixar arquivos parciais

---

## Regras de Negócio por Módulo

### Módulo: Question Engine
- Todas as perguntas devem ter mensagem clara e descritiva
- Opções de múltipla escolha devem ser exaustivas quando possível
- Validação deve acontecer imediatamente após input
- Feedback visual (spinner, progresso) durante processamento

### Módulo: Template Engine
- Templates devem usar placeholders claros e consistentes
- Todos os placeholders devem ser substituídos (não deixar `[Placeholder]` no output)
- Templates devem ser validados antes de uso
- Encoding UTF-8 obrigatório

### Módulo: File Generator
- Criar diretórios antes de arquivos
- Operações devem ser atômicas quando possível
- Validar estrutura criada após geração
- Mostrar resumo do que foi criado

---

## Validações Obrigatórias

### Antes de Gerar Arquivos
- [ ] Verificar se diretório do projeto é válido
- [ ] Verificar permissões de escrita
- [ ] Validar todos os inputs do usuário
- [ ] Confirmar ação se arquivos existirem

### Antes de Processar Templates
- [ ] Validar que todos os templates existem
- [ ] Validar que todos os placeholders têm valores
- [ ] Validar encoding dos templates (UTF-8)

### Após Gerar Estrutura
- [ ] Verificar que todos os arquivos foram criados
- [ ] Validar estrutura de diretórios
- [ ] Mostrar resumo para usuário

---

## Exceções e Casos Especiais

### Exceção 1: Projeto sem package.json
- **Quando:** Usuário executa em diretório sem package.json
- **Comportamento:** Avisar mas permitir continuar, usar valores padrão
- **Aprovação necessária:** Não (é comportamento esperado)

### Exceção 2: Stack tecnológica desconhecida
- **Quando:** Usuário seleciona stack não suportada
- **Comportamento:** Avisar que templates podem não ser completos, mas gerar estrutura básica
- **Aprovação necessária:** Não (permitir flexibilidade)

---

## Regras de Negócio Implícitas

Estas regras não estão explícitas no código, mas devem ser seguidas:

- CLI deve ser rápida (< 5 segundos para execução completa)
- Mensagens ao usuário (CLI output) devem ser em português brasileiro (pt-BR)
- Output deve ser limpo e profissional (sem logs desnecessários)
- CLI deve funcionar mesmo sem conexão de internet
- Não deve modificar arquivos fora de `.cursor/`

> **Nota sobre idioma:** Para regras detalhadas sobre idioma do código vs comentários vs mensagens, ver `.cursor/rules/code-style.md`

---

## Pontos que Precisam de Validação

Estes pontos são ambíguos e precisam ser validados durante desenvolvimento:

- **Detecção automática de stack:** Até que ponto detectar automaticamente vs perguntar?
- **Templates customizáveis:** Permitir usuário fornecer templates próprios no MVP?
- **Modo não-interativo:** Adicionar flags para automação no MVP ou depois?
- **Validação pós-geração:** Validar estrutura gerada contra regras ou apenas criar?

---

## Related Documentation

- **Project Goals:** `.cursor/context/project-goals.md`
- **Architecture:** `.cursor/context/architecture.md`
- **Extract Business Rules:** `.cursor/commands/extract-business-rules.md`

