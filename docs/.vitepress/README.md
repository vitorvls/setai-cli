# VitePress - Documentação SetAI CLI

Esta documentação foi migrada do Docsify para VitePress.

## 🚀 Comandos

```bash
# Desenvolvimento (hot reload)
pnpm docs:dev

# Build para produção
pnpm docs:build

# Preview do build
pnpm docs:serve
```

## 📁 Estrutura

```
docs/
├── .vitepress/
│   ├── config.ts          # Configuração principal
│   ├── theme/
│   │   ├── index.ts       # Tema customizado
│   │   └── custom.css     # Estilos customizados
│   └── components/
│       └── LanguageSelector.vue  # Seletor de idioma
├── index.md               # Página inicial
├── Documentation/         # Documentação do usuário
│   ├── README.md
│   ├── en/
│   └── es/
└── Documentation_4_devs/ # Documentação técnica
    └── README.md
```

## ✨ Funcionalidades

- ✅ Design moderno e responsivo
- ✅ Dark mode nativo
- ✅ Busca integrada
- ✅ Seletor de idioma
- ✅ Sidebar automática
- ✅ Navegação por idiomas
- ✅ SEO otimizado
- ✅ Performance superior

## 🎨 Customizações

As customizações estão em:
- `theme/custom.css` - Estilos customizados
- `theme/index.ts` - Componentes Vue customizados
- `config.ts` - Configuração completa
