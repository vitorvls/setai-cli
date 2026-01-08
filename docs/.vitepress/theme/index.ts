import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LanguageSelector from '../components/LanguageSelector.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('LanguageSelector', LanguageSelector)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h('div', { class: 'nav-actions' }, [
        h(LanguageSelector)
      ])
    })
  }
} satisfies Theme
