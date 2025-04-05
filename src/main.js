import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ترتيب الاستيراد مهم:
import 'element-plus/dist/index.css' // أولاً: ستايلات Element Plus
import './assets/css/fonts.css'      // ثم: الخطوط الخاصة بك
import './assets/css/Tailwend.css'   // وأخيراً: أي CSS مخصص أو Tailwind
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const vuetify = createVuetify({
    components,
    directives,
    defaults: {},
    icons: {
      defaultSet: 'mdi',
    },
  })

import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(vuetify)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}