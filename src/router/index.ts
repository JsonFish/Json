// 使用 vue-router 配置路由
import { createRouter, createWebHistory } from 'vue-router'
import { constantRouter } from '@/router/routes.ts'

let router = createRouter({
    // 路由模式 hash
    history: createWebHistory(),
    routes: constantRouter
})

export default router