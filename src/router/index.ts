// 使用 vue-router 配置路由
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from '@/router/routes.ts'

let router = createRouter({
    // 路由模式 hash
    history: createWebHashHistory(),
    routes: constantRoute
})

router.beforeEach((to, from, next) => {
    // 动态title
    if(to.meta.title){
        document.title = to.meta.title as string + " | " + import.meta.env.VITE_BLOG_TITLE;
    }else{
        document.title = import.meta.env.VITE_BLOG_TITLE;
    }
    next();
})
// 跳转后自动返回页面顶部
router.afterEach(() => {
    window.scrollTo(0, 0);
})

export default router