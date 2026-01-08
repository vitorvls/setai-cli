#!/usr/bin/env node

/**
 * Script de Release para publicação no npm
 * 
 * Uso:
 *   node scripts/release.js [patch|minor|major]
 * 
 * Exemplos:
 *   node scripts/release.js patch  # 0.1.0 -> 0.1.1
 *   node scripts/release.js minor  # 0.1.0 -> 0.2.0
 *   node scripts/release.js major  # 0.1.0 -> 1.0.0
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

function getCurrentVersion() {
  const packageJson = JSON.parse(
    readFileSync(join(rootDir, 'package.json'), 'utf-8')
  );
  return packageJson.version;
}

function updateVersion(type) {
  const currentVersion = getCurrentVersion();
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  let newVersion;
  switch (type) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    default:
      throw new Error(`Tipo de versão inválido: ${type}. Use: patch, minor ou major`);
  }

  const packageJsonPath = join(rootDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  packageJson.version = newVersion;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  return { currentVersion, newVersion };
}

function runCommand(command, description) {
  console.log(`\n📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: rootDir });
    console.log(`✅ ${description} concluído!`);
  } catch (error) {
    console.error(`❌ Erro ao executar: ${description}`);
    process.exit(1);
  }
}

function main() {
  const type = process.argv[2] || 'patch';

  if (!['patch', 'minor', 'major'].includes(type)) {
    console.error('❌ Tipo de versão inválido. Use: patch, minor ou major');
    process.exit(1);
  }

  console.log('🚀 Iniciando processo de release...\n');

  // 1. Verificar se há mudanças não commitadas
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (gitStatus.trim()) {
      console.warn('⚠️  Aviso: Há mudanças não commitadas no repositório.');
      console.warn('   Considere fazer commit antes de publicar.\n');
    }
  } catch (error) {
    console.warn('⚠️  Não foi possível verificar o status do git.\n');
  }

  // 2. Executar testes
  runCommand('pnpm test', 'Executando testes');

  // 3. Executar lint
  runCommand('pnpm lint', 'Executando lint');

  // 4. Executar type-check
  runCommand('pnpm type-check', 'Verificando tipos TypeScript');

  // 5. Build
  runCommand('pnpm build', 'Compilando projeto');

  // 6. Atualizar versão
  const { currentVersion, newVersion } = updateVersion(type);
  console.log(`\n📝 Versão atualizada: ${currentVersion} -> ${newVersion}`);

  // 7. Criar tag git
  const tag = `v${newVersion}`;
  console.log(`\n🏷️  Criando tag git: ${tag}`);
  try {
    execSync(`git add package.json`, { stdio: 'inherit', cwd: rootDir });
    execSync(`git commit -m "chore: bump version to ${newVersion}"`, {
      stdio: 'inherit',
      cwd: rootDir,
    });
    execSync(`git tag ${tag}`, { stdio: 'inherit', cwd: rootDir });
    console.log(`✅ Tag ${tag} criada!`);
  } catch (error) {
    console.warn('⚠️  Não foi possível criar tag git. Continue manualmente se necessário.');
  }

  console.log('\n✨ Release preparado com sucesso!');
  console.log('\n📋 Próximos passos:');
  console.log(`   1. Revisar as mudanças: git log`);
  console.log(`   2. Push das mudanças: git push && git push --tags`);
  console.log(`   3. Publicar no npm: npm publish`);
  console.log(`\n   Ou execute tudo de uma vez:`);
  console.log(`   git push && git push --tags && npm publish`);
}

main();
