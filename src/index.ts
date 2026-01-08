/**
 * SetAI CLI - Entry Point
 * CLI Tool para gerar estrutura .cursor
 */

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { configCommand } from './commands/config.js';
import { initI18n } from './utils/i18n.js';
import { loadConfig, getLanguageConfig } from './config/config-manager.js';

// Inicializa i18n
async function initializeI18n(): Promise<void> {
  await loadConfig();
  const langConfig = getLanguageConfig();
  await initI18n(langConfig.questions || 'pt-BR');
}

// Inicializa antes de executar comandos
initializeI18n().catch(() => {
  // Se falhar, continua com pt-BR como padrão
});

const program = new Command();

program
  .name('setai')
  .description('CLI Tool para gerar estrutura .cursor através de perguntas interativas')
  .version('0.1.0')
  .addHelpText(
    'after',
    `
Exemplos:
  $ setai init                    # Geração básica da estrutura de configuração
  $ setai init --advanced         # Inclui perguntas avançadas (AI Usage Rules, modelos preferidos)
  $ setai init --beta             # Habilita integração com IA para enriquecer respostas
  $ setai init --advanced --beta  # Modo completo com perguntas avançadas e IA
  $ setai init --lang en          # Executa em inglês
  $ setai init --lang es          # Executa em espanhol
  $ setai config                   # Gerencia API keys e configurações do CLI

Comandos:
  init                            Gera estrutura de configuração para IA
  config                          Gerencia API keys e configurações

Opções do comando init:
  --advanced                      Inclui perguntas opcionais sobre:
                                  - Modelos de IA preferidos por fase
                                  - Regras de uso de IA (permitir/proibir)
                                  - Responsabilidades (CTO, Tech Lead, Dev)
                                  - Restrições customizadas
                                  - Arquitetura, Segurança, Testes, Deploy, etc.

  --beta                          Habilita integração com IA para enriquecer respostas
                                  Requer API keys configuradas via: setai config
                                  Suporta: OpenAI, Anthropic, Google

  --lang <locale>                 Idioma das perguntas e arquivos gerados
                                  Valores: pt-BR (padrão), en, es

Configuração de API Keys:
  Para usar o modo --beta, configure suas API keys:
  $ setai config

  As API keys são armazenadas em: ~/.setai/config.json
  NÃO use variáveis de ambiente - use o comando config!

Documentação:
  Para mais informações, visite: https://github.com/setai/cli
`
  );

program
  .command('init')
  .description('Inicia a geração da estrutura de configuração para IA')
  .option('--advanced', 'Inclui perguntas avançadas opcionais (AI Usage Rules, modelos preferidos, etc.)')
  .option('--beta', 'Habilita integração com IA para enriquecer respostas (configure API keys com: setai config)')
  .option('--lang <locale>', 'Idioma das perguntas e arquivos (pt-BR, en, es)', 'pt-BR')
  .action(async (options) => {
    await initCommand(options.advanced ?? false, options.beta ?? false, options.lang);
  });

program
  .command('config')
  .description('Gerencia configuração do CLI (API keys, etc.)')
  .action(async () => {
    await configCommand();
  });

program.parse();
