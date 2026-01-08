/**
 * Script para ajudar na tradução de templates
 * Este script lista todos os templates que precisam ser traduzidos
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const templatesDir = join(rootDir, 'templates/.cursor')
const enDir = join(rootDir, 'templates/.cursor.en')
const esDir = join(rootDir, 'templates/.cursor.es')

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

async function checkTranslations() {
  const ptTemplates = await getAllTemplates(templatesDir)
  const enTemplates = await getAllTemplates(enDir)
  const esTemplates = await getAllTemplates(esDir)
  
  console.log('\n📊 Status das Traduções de Templates\n')
  console.log(`Total de templates em pt-BR: ${ptTemplates.length}`)
  console.log(`Total de templates em en: ${enTemplates.length}`)
  console.log(`Total de templates em es: ${esTemplates.length}\n`)
  
  console.log('❌ Templates faltando tradução:\n')
  
  for (const template of ptTemplates) {
    const hasEn = enTemplates.includes(template)
    const hasEs = esTemplates.includes(template)
    
    if (!hasEn || !hasEs) {
      console.log(`  ${template}`)
      if (!hasEn) console.log(`    ❌ EN`)
      if (!hasEs) console.log(`    ❌ ES`)
    }
  }
  
  console.log(`\n✅ Progresso: ${((enTemplates.length + esTemplates.length) / (ptTemplates.length * 2) * 100).toFixed(1)}%`)
}

checkTranslations().catch(console.error)
