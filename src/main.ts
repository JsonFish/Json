import { createApp } from 'vue'
// 引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from '@/App.vue'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import gloablComponent from '@/components'
// 引入仓库
import pinia from "./store";
// 引入路由
import router from '@/router'
// 引入模板的全局的样式
import '@/styles/index.scss'
// 获取应用实例对象
const app = createApp(App)
// 全局注册element-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(pinia)
app.use(gloablComponent)
app.use(router)
// 挂载
app.mount('#app')
