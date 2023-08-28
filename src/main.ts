import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import gloablComponent from '@/components'
import router from '@/router'
// 引入模板的全局的样式
import '@/styles/index.scss'

// 获取应用实例对象
const app = createApp(App)
app.use(ElementPlus)
// 安装自定义插件
app.use(gloablComponent)
// 安装路由
app.use(router)

app.mount('#app')
