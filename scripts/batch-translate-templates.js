/**
 * Script para criar estrutura de diretórios para templates traduzidos
 * e listar todos os templates que precisam ser traduzidos
 */

import { readdir, readFile, writeFile, mkdir, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const templatesDir = join(rootDir, 'templates/.cursor')
const enDir = join(rootDir, 'templates/.cursor.en')
const esDir = join(rootDir, 'templates/.cursor.es')

async function ensureDir(dir) {
  try {
    await stat(dir)
  } catch {
    await mkdir(dir, { recursive: true })
  }
}

async function getAllTemplates(dir, basePath = '') {
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    const relativePath = join(basePath, entry.name)
    
    if (entry.isDirectory()) {
      const subFiles = await getAllTemplates(fullPath, relativePath)
      files.push(...subFiles)
    } else if (entry.isFile() && entry.name.endsWith('.template')) {
      files.push(relativePath)
    }
  }
  
  return files
}

async function createDirectoryStructure() {
  const ptTemplates = await getAllTemplates(templatesDir)
  
  for (const template of ptTemplates) {
    const dirPath = dirname(template)
    
    // Create directory structure in en
    if (dirPath !== '.') {
      await ensureDir(join(enDir, dirPath))
      await ensureDir(join(esDir, dirPath))
    }
  }
  
  console.log('✅ Directory structure created for translations')
}

createDirectoryStructure().catch(console.error)
