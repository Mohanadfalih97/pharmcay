import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/css/Tailwend.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';  // لتضمين الأنماط
import './assets/css/fonts.css'

const app = createApp(App);

createApp(App).mount('#app')
app.use(ElementPlus);

