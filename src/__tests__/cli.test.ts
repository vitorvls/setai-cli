import { describe, it, expect, beforeEach } from 'vitest';
import { Command } from 'commander';

/**
 * Testes para CLI Entry Point
 * Testa o comando básico e estrutura do CLI
 */

describe('CLI Entry Point', () => {
  let program: Command;

  beforeEach(() => {
    program = new Command();
  });

  it('should have init command', () => {
    // Arrange
    program.name('setai').description('CLI Tool para gerar estrutura .cursor');

    // Act
    program.command('init').description('Inicia a geração da estrutura .cursor');

    // Assert
    const initCommand = program.commands.find((cmd) => cmd.name() === 'init');
    expect(initCommand).toBeDefined();
    expect(initCommand?.description()).toBe('Inicia a geração da estrutura .cursor');
  });

  it('should parse init command', () => {
    // Arrange
    program.name('setai').description('CLI Tool para gerar estrutura .cursor');
    program.command('init').description('Inicia a geração da estrutura .cursor');

    // Act
    program.parse(['node', 'setai', 'init']);

    // Assert
    expect(program.args).toContain('init');
  });
});
