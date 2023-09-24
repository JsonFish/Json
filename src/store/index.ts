// 引入pinia创建方法
import { createPinia } from "pinia";
// 引入持久化插件
import { persistedstate } from "@/plugins/persistedstate";
// 创建pinia并返回pinia实例
const pinia = createPinia()
// use持久化插件
pinia.use(persistedstate)
// 导出pinia
export default pinia