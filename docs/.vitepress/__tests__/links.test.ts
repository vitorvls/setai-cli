/**
 * Testes para verificar se todos os links da documentação funcionam
 */

import { describe, it, expect } from 'vitest'
import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsRoot = join(__dirname, '../..')

/**
 * Extrai links markdown de um arquivo
 */
function extractMarkdownLinks(content: string): Array<{ text: string; url: string }> {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links: Array<{ text: string; url: string }> = []
  let match

  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2]
    })
  }

  return links
}

/**
 * Verifica se um link é válido
 */
async function isValidLink(url: string, currentFile: string): Promise<boolean> {
  // Ignora links externos
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
    return true
  }

  // Remove âncoras - links que são apenas âncoras (#section) são válidos
  const [path, anchor] = url.split('#')
  
  // Se o path está vazio e tem âncora, é um link de âncora (válido)
  if (!path || path === '' || path === '.') {
    return true
  }
  
  // Links relativos
  if (path.startsWith('./') || path.startsWith('../')) {
    const currentDir = dirname(currentFile)
    let targetPath = join(currentDir, path)
    
    // Remove trailing slash
    if (targetPath.endsWith('/')) {
      targetPath = targetPath.slice(0, -1)
    }
    
    try {
      const stats = await stat(targetPath)
      if (stats.isFile()) {
        return true
      }
      if (stats.isDirectory()) {
        // Verifica se tem README.md ou index.md
        const readmePath = join(targetPath, 'README.md')
        try {
          await stat(readmePath)
          return true
        } catch {
          return false
        }
      }
      return false
    } catch {
      // Tenta com .md
      const mdPath = `${targetPath}.md`
      try {
        await stat(mdPath)
        return true
      } catch {
        return false
      }
    }
  }

  // Links absolutos (começam com /)
  if (path.startsWith('/')) {
    let targetPath = join(docsRoot, path.replace(/^\//, ''))
    
    // Remove trailing slash
    if (targetPath.endsWith('/')) {
      targetPath = targetPath.slice(0, -1)
    }
    
    // Tenta como arquivo .md
    const mdPath = targetPath.endsWith('.md') ? targetPath : `${targetPath}.md`
    try {
      const stats = await stat(mdPath)
      if (stats.isFile()) {
        return true
      }
    } catch {
      // Ignora erro
    }
    
    // Tenta como diretório
    try {
      const dirStats = await stat(targetPath)
      if (dirStats.isDirectory()) {
        const indexPath = join(targetPath, 'README.md')
        try {
          await stat(indexPath)
          return true
        } catch {
          return false
        }
      }
    } catch {
      return false
    }
    
    return false
  }

  // Links sem prefixo (relativos ao diretório atual)
  if (!path.includes('/')) {
    const currentDir = dirname(currentFile)
    let targetPath = join(currentDir, path)
    
    // Remove trailing slash
    if (targetPath.endsWith('/')) {
      targetPath = targetPath.slice(0, -1)
    }
    
    try {
      const stats = await stat(targetPath)
      if (stats.isFile()) {
        return true
      }
      if (stats.isDirectory()) {
        const readmePath = join(targetPath, 'README.md')
        try {
          await stat(readmePath)
          return true
        } catch {
          return false
        }
      }
    } catch {
      // Tenta com .md
      const mdPath = `${targetPath}.md`
      try {
        await stat(mdPath)
        return true
      } catch {
        return false
      }
    }
  }

  return false
}

/**
 * Recursivamente encontra todos os arquivos .md
 */
async function findMarkdownFiles(dir: string, files: string[] = []): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    
    // Ignora node_modules, .vitepress, etc
    if (entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue
    }

    if (entry.isDirectory()) {
      await findMarkdownFiles(fullPath, files)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

describe('Documentation Links', () => {
  it('should have all internal links valid', async () => {
    const markdownFiles = await findMarkdownFiles(docsRoot)
    const brokenLinks: Array<{ file: string; link: string; url: string }> = []

    for (const file of markdownFiles) {
      const content = await readFile(file, 'utf-8')
      const links = extractMarkdownLinks(content)

      for (const link of links) {
        const isValid = await isValidLink(link.url, file)
        if (!isValid) {
          brokenLinks.push({
            file: file.replace(docsRoot, ''),
            link: link.text,
            url: link.url
          })
        }
      }
    }

    if (brokenLinks.length > 0) {
      console.error('Broken links found:')
      brokenLinks.forEach(({ file, link, url }) => {
        console.error(`  - ${file}: [${link}](${url})`)
      })
    }

    expect(brokenLinks.length).toBe(0)
  })

  it('should have valid links in Documentation_4_devs README', async () => {
    const readmePath = join(docsRoot, 'Documentation_4_devs/README.md')
    const content = await readFile(readmePath, 'utf-8')
    const links = extractMarkdownLinks(content)

    for (const link of links) {
      // Skip external links
      if (link.url.startsWith('http')) continue
      
      const isValid = await isValidLink(link.url, readmePath)
      expect(isValid).toBe(true)
    }
  })
})
