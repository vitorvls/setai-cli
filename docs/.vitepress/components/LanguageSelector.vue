<template>
  <div class="language-selector-wrapper">
    <select 
      :value="currentLang" 
      @change="handleLanguageChange" 
      class="lang-select"
      aria-label="Selecionar idioma"
    >
      <option value="pt-BR">🇧🇷 Português</option>
      <option value="en">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vitepress'

const router = useRouter()
const route = useRoute()
const currentLang = ref('pt-BR')

function getLanguageFromPath(path: string): string {
  if (path.startsWith('/en/') || path.includes('/Documentation/en/') || path.includes('/Documentation_4_devs/en/')) return 'en'
  if (path.startsWith('/es/') || path.includes('/Documentation/es/') || path.includes('/Documentation_4_devs/es/')) return 'es'
  return 'pt-BR'
}

function getPageName(path: string): string {
  // Extract page name from path
  // /Documentation/en/GETTING_STARTED -> GETTING_STARTED
  // /Documentation/COMMANDS -> COMMANDS
  // /Documentation_4_devs/en/README -> README
  // /Documentation_4_devs/ARQUITETURA -> ARQUITETURA
  
  // Handle Documentation_4_devs with language
  if (path.includes('/Documentation_4_devs/')) {
    const parts = path.split('/Documentation_4_devs/')
    if (parts.length > 1) {
      const after = parts[1]
      // Remove language prefix if exists
      const withoutLang = after.replace(/^(en|es)\//, '')
      return withoutLang || 'README'
    }
    return path.replace('/Documentation_4_devs/', '') || 'README'
  }
  
  // Remove language prefix
  let pagePath = path.replace(/^\/Documentation\/(en|es)\//, '/Documentation/')
  
  // Remove /Documentation/ prefix
  pagePath = pagePath.replace('/Documentation/', '')
  
  // Handle index/README
  if (pagePath === '' || pagePath === 'README' || pagePath === 'index') {
    return 'README'
  }
  
  return pagePath
}

async function handleLanguageChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const newLang = target.value
  
  const currentPath = route.path
  const pageName = getPageName(currentPath)
  
  let newPath = ''
  
  // Handle Documentation_4_devs
  if (currentPath.includes('/Documentation_4_devs/')) {
    if (newLang === 'en') {
      newPath = `/Documentation_4_devs/en/${pageName}`
    } else if (newLang === 'es') {
      newPath = `/Documentation_4_devs/es/${pageName}`
    } else {
      newPath = `/Documentation_4_devs/${pageName}`
    }
  }
  // Handle index page
  else if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index') {
    if (newLang === 'en') {
      newPath = '/en/'
    } else if (newLang === 'es') {
      newPath = '/es/'
    } else {
      newPath = '/'
    }
  } 
  // Handle Documentation pages
  else if (currentPath.startsWith('/Documentation/')) {
    if (newLang === 'en') {
      newPath = `/Documentation/en/${pageName}`
    } else if (newLang === 'es') {
      newPath = `/Documentation/es/${pageName}`
    } else {
      newPath = `/Documentation/${pageName}`
    }
  }
  // Handle locale root pages (/en/, /es/)
  else if (currentPath.startsWith('/en/') || currentPath.startsWith('/es/')) {
    if (newLang === 'en') {
      newPath = '/en/'
    } else if (newLang === 'es') {
      newPath = '/es/'
    } else {
      newPath = '/'
    }
  }
  
  // Update current lang before navigation
  currentLang.value = newLang
  
  // Navigate to new path
  if (newPath && newPath !== currentPath) {
    await nextTick()
    router.go(newPath)
  }
}

// Watch for route changes to update selector
watch(() => route.path, (newPath) => {
  const lang = getLanguageFromPath(newPath)
  if (currentLang.value !== lang) {
    currentLang.value = lang
  }
}, { immediate: true })

onMounted(() => {
  currentLang.value = getLanguageFromPath(route.path)
})
</script>

<style scoped>
.language-selector-wrapper {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.lang-select {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 8px 32px 8px 12px;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="%236366f1" d="M6 9L1 4h10z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  transition: all 0.2s ease;
  min-width: 140px;
}

.lang-select:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg);
}

.lang-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

@media (max-width: 768px) {
  .language-selector-wrapper {
    margin-left: 0.5rem;
  }
  
  .lang-select {
    min-width: 120px;
    padding: 6px 28px 6px 10px;
    font-size: 0.85rem;
  }
}
</style>
