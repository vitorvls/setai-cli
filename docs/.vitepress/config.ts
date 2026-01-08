import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SetAI CLI',
  description: 'CLI Tool para gerar estrutura .cursor através de perguntas interativas',
  
  // Base URL
  base: '/',
  
  // Idioma padrão
  lang: 'pt-BR',
  
  // Head
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap', rel: 'stylesheet' }]
  ],
  
  // i18n configuration
  locales: {
    root: {
      label: 'Português',
      lang: 'pt-BR',
      link: '/',
      title: 'SetAI CLI',
      description: 'CLI Tool para gerar estrutura .cursor através de perguntas interativas',
      themeConfig: {
        // Logo
        logo: '/logo.svg',
        
        // Navegação principal
        nav: [
          { text: 'Início', link: '/' },
          { text: 'Documentação', link: '/Documentation/README' },
          { text: 'Guia', link: '/Documentation/GETTING_STARTED' },
          { text: 'Documentação Técnica', link: '/Documentation_4_devs/README' }
        ],
        
        // Sidebar
        sidebar: {
          '/Documentation/': [
            {
              text: 'Documentação',
              items: [
                { text: 'Início', link: '/Documentation/README' },
                { text: 'Getting Started', link: '/Documentation/GETTING_STARTED' },
                { text: 'Uso Básico', link: '/Documentation/USAGE_BASIC' },
                { text: 'Uso Avançado', link: '/Documentation/USAGE_ADVANCED' },
                { text: 'Modo Beta (IA)', link: '/Documentation/USAGE_BETA' },
                { text: 'Configuração', link: '/Documentation/CONFIGURATION' },
                { text: 'Configuração de IDEs', link: '/Documentation/CONFIGURATION_IDES' },
                { text: 'Comandos', link: '/Documentation/COMMANDS' },
                { text: 'Exemplos', link: '/Documentation/EXAMPLES' },
                { text: 'FAQ', link: '/Documentation/FAQ' },
                { text: 'Troubleshooting', link: '/Documentation/TROUBLESHOOTING' },
                { text: 'Arquitetura', link: '/Documentation/ARCHITECTURE' },
                { text: 'Providers de IA', link: '/Documentation/PROVIDERS' },
                { text: 'Templates', link: '/Documentation/TEMPLATES' }
              ]
            }
          ],
          '/Documentation_4_devs/': [
            {
              text: 'Documentação Técnica',
              items: [
                { text: 'Visão Geral', link: '/Documentation_4_devs/README' },
                { text: 'Estrutura do Projeto', link: '/Documentation_4_devs/ESTRUTURA_PROJETO' },
                { text: 'Arquivos Principais', link: '/Documentation_4_devs/ARQUIVOS_PRINCIPAIS' },
                { text: 'Arquitetura', link: '/Documentation_4_devs/ARQUITETURA' },
                { text: 'Guia de Desenvolvimento', link: '/Documentation_4_devs/DESENVOLVIMENTO' },
                { text: 'Guia de Testes', link: '/Documentation_4_devs/TESTES' },
                { text: 'Contribuindo', link: '/Documentation_4_devs/CONTRIBUINDO' },
                { text: 'Fluxo de Dados', link: '/Documentation_4_devs/FLUXO_DADOS' },
                { text: 'Internacionalização', link: '/Documentation_4_devs/INTERNACIONALIZACAO' }
              ]
            }
          ]
        },
        
        // Footer
        footer: {
          message: 'Documentação do SetAI CLI',
          copyright: 'Copyright © 2024 SetAI'
        },
        
        // Edit link
        editLink: {
          pattern: 'https://github.com/setai/cli/edit/main/docs/:path',
          text: 'Editar esta página no GitHub'
        },
        
        // Dark mode
        darkModeSwitchLabel: 'Tema',
        darkModeSwitchTitle: 'Alternar tema escuro',
        lightModeSwitchTitle: 'Alternar tema claro',
        
        // Outline
        outline: {
          level: [2, 3],
          label: 'Nesta página'
        },
        
        // Last updated
        lastUpdated: {
          text: 'Última atualização',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        
        // Doc footer
        docFooter: {
          prev: 'Página anterior',
          next: 'Próxima página'
        },
        
        // Return to top
        returnToTopLabel: 'Voltar ao topo'
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'SetAI CLI',
      description: 'CLI Tool to generate .cursor configuration structure through interactive questions',
      themeConfig: {
        // Logo
        logo: '/logo.svg',
        
        // Navegação principal
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/Documentation/en/README' },
          { text: 'Guide', link: '/Documentation/en/GETTING_STARTED' },
          { text: 'Technical Docs', link: '/Documentation_4_devs/en/README' }
        ],
        
        // Sidebar
        sidebar: {
          '/Documentation/en/': [
            {
              text: 'Documentation',
              items: [
                { text: 'Home', link: '/Documentation/en/README' },
                { text: 'Getting Started', link: '/Documentation/en/GETTING_STARTED' },
                { text: 'Basic Usage', link: '/Documentation/en/USAGE_BASIC' },
                { text: 'Advanced Usage', link: '/Documentation/en/USAGE_ADVANCED' },
                { text: 'Beta Mode (AI)', link: '/Documentation/en/USAGE_BETA' },
                { text: 'Configuration', link: '/Documentation/en/CONFIGURATION' },
                { text: 'IDE Configuration', link: '/Documentation/en/CONFIGURATION_IDES' },
                { text: 'Commands', link: '/Documentation/en/COMMANDS' },
                { text: 'Examples', link: '/Documentation/en/EXAMPLES' },
                { text: 'FAQ', link: '/Documentation/en/FAQ' },
                { text: 'Troubleshooting', link: '/Documentation/en/TROUBLESHOOTING' },
                { text: 'Architecture', link: '/Documentation/en/ARCHITECTURE' },
                { text: 'AI Providers', link: '/Documentation/en/PROVIDERS' },
                { text: 'Templates', link: '/Documentation/en/TEMPLATES' }
              ]
            }
          ],
          '/Documentation_4_devs/en/': [
            {
              text: 'Technical Documentation',
              items: [
                { text: 'Overview', link: '/Documentation_4_devs/en/README' },
                { text: 'Project Structure', link: '/Documentation_4_devs/en/PROJECT_STRUCTURE' },
                { text: 'Main Files', link: '/Documentation_4_devs/en/MAIN_FILES' },
                { text: 'Architecture', link: '/Documentation_4_devs/en/ARCHITECTURE' },
                { text: 'Development Guide', link: '/Documentation_4_devs/en/DEVELOPMENT' },
                { text: 'Testing Guide', link: '/Documentation_4_devs/en/TESTING' },
                { text: 'Contributing', link: '/Documentation_4_devs/en/CONTRIBUTING' },
                { text: 'Data Flow', link: '/Documentation_4_devs/en/DATA_FLOW' },
                { text: 'Internationalization', link: '/Documentation_4_devs/en/INTERNATIONALIZATION' }
              ]
            }
          ]
        },
        
        // Footer
        footer: {
          message: 'SetAI CLI Documentation',
          copyright: 'Copyright © 2024 SetAI'
        },
        
        // Edit link
        editLink: {
          pattern: 'https://github.com/setai/cli/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        
        // Dark mode
        darkModeSwitchLabel: 'Theme',
        darkModeSwitchTitle: 'Toggle dark mode',
        lightModeSwitchTitle: 'Toggle light mode',
        
        // Outline
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        
        // Last updated
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        
        // Doc footer
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        
        // Return to top
        returnToTopLabel: 'Back to top'
      }
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      title: 'SetAI CLI',
      description: 'Herramienta CLI para generar estructura .cursor a través de preguntas interactivas',
      themeConfig: {
        // Logo
        logo: '/logo.svg',
        
        // Navegação principal
        nav: [
          { text: 'Inicio', link: '/es/' },
          { text: 'Documentación', link: '/Documentation/es/README' },
          { text: 'Guía', link: '/Documentation/es/GETTING_STARTED' },
          { text: 'Documentación Técnica', link: '/Documentation_4_devs/es/README' }
        ],
        
        // Sidebar
        sidebar: {
          '/Documentation/es/': [
            {
              text: 'Documentación',
              items: [
                { text: 'Inicio', link: '/Documentation/es/README' },
                { text: 'Inicio Rápido', link: '/Documentation/es/GETTING_STARTED' },
                { text: 'Uso Básico', link: '/Documentation/es/USAGE_BASIC' },
                { text: 'Uso Avanzado', link: '/Documentation/es/USAGE_ADVANCED' },
                { text: 'Modo Beta (IA)', link: '/Documentation/es/USAGE_BETA' },
                { text: 'Configuración', link: '/Documentation/es/CONFIGURATION' },
                { text: 'Configuración de IDEs', link: '/Documentation/es/CONFIGURATION_IDES' },
                { text: 'Comandos', link: '/Documentation/es/COMMANDS' },
                { text: 'Ejemplos', link: '/Documentation/es/EXAMPLES' },
                { text: 'FAQ', link: '/Documentation/es/FAQ' },
                { text: 'Solución de Problemas', link: '/Documentation/es/TROUBLESHOOTING' },
                { text: 'Arquitectura', link: '/Documentation/es/ARCHITECTURE' },
                { text: 'Providers de IA', link: '/Documentation/es/PROVIDERS' },
                { text: 'Plantillas', link: '/Documentation/es/TEMPLATES' }
              ]
            }
          ],
          '/Documentation_4_devs/es/': [
            {
              text: 'Documentación Técnica',
              items: [
                { text: 'Visión General', link: '/Documentation_4_devs/es/README' },
                { text: 'Estructura del Proyecto', link: '/Documentation_4_devs/es/ESTRUCTURA_PROYECTO' },
                { text: 'Archivos Principales', link: '/Documentation_4_devs/es/ARCHIVOS_PRINCIPALES' },
                { text: 'Arquitectura', link: '/Documentation_4_devs/es/ARQUITECTURA' },
                { text: 'Guía de Desarrollo', link: '/Documentation_4_devs/es/DESARROLLO' },
                { text: 'Guía de Pruebas', link: '/Documentation_4_devs/es/PRUEBAS' },
                { text: 'Contribuyendo', link: '/Documentation_4_devs/es/CONTRIBUYENDO' },
                { text: 'Flujo de Datos', link: '/Documentation_4_devs/es/FLUJO_DATOS' },
                { text: 'Internacionalización', link: '/Documentation_4_devs/es/INTERNACIONALIZACION' }
              ]
            }
          ]
        },
        
        // Footer
        footer: {
          message: 'Documentación de SetAI CLI',
          copyright: 'Copyright © 2024 SetAI'
        },
        
        // Edit link
        editLink: {
          pattern: 'https://github.com/setai/cli/edit/main/docs/:path',
          text: 'Editar esta página en GitHub'
        },
        
        // Dark mode
        darkModeSwitchLabel: 'Tema',
        darkModeSwitchTitle: 'Alternar tema oscuro',
        lightModeSwitchTitle: 'Alternar tema claro',
        
        // Outline
        outline: {
          level: [2, 3],
          label: 'En esta página'
        },
        
        // Last updated
        lastUpdated: {
          text: 'Última actualización',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        
        // Doc footer
        docFooter: {
          prev: 'Página anterior',
          next: 'Página siguiente'
        },
        
        // Return to top
        returnToTopLabel: 'Volver arriba'
      }
    }
  },
  
  // Tema (fallback para root)
  themeConfig: {
    // Logo
    logo: '/logo.svg',
    
    // Busca
    search: {
      provider: 'local',
      options: {
        locales: {
          'pt-BR': {
            translations: {
              button: {
                buttonText: 'Buscar',
                buttonAriaLabel: 'Buscar na documentação'
              },
              modal: {
                noResultsText: 'Nenhum resultado encontrado',
                resetButtonTitle: 'Limpar',
                footer: {
                  selectText: 'para selecionar',
                  navigateText: 'para navegar',
                  closeText: 'fechar'
                }
              }
            }
          },
          'en': {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'close'
                }
              }
            }
          },
          'es': {
            translations: {
              button: {
                buttonText: 'Buscar',
                buttonAriaLabel: 'Buscar en la documentación'
              },
              modal: {
                noResultsText: 'No se encontraron resultados',
                resetButtonTitle: 'Limpiar',
                footer: {
                  selectText: 'para seleccionar',
                  navigateText: 'para navegar',
                  closeText: 'cerrar'
                }
              }
            }
          }
        }
      }
    },
    
    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/setai/cli' }
    ]
  },
  
  // Markdown
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
