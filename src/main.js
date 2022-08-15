import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import realImg from '@/directive'
// import router from './router'

import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import 'virtual:svg-icons-register'
import '@/styles/base.scss'
import SvgIcon from './components/SvgIcon.vue'
import '@/permission'
import useInit from '@/hooks/useInit'
import store from '@/store'

const { router } = useInit()

const app = createApp(App)

app.directive('img', realImg)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus, { size: 'small' })
app.use(router)
app.use(store)

app.mount('#app')
