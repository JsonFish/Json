// import { RouteRecordRaw } from "vue-router"/
import Layout from "@/components/Layout/index.vue"
export const constantRoute = [
    {
        path: "/",
        name: "Layout",
        meta: {
            name: "Layout",
        },
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {
                    title: '主页',
                    icon: 'HomeFilled'
                }
            },
            {
                path: '/sort',
                component: () => import('@/views/sort/index.vue'),
                name: 'sort',
                meta: {
                    title: '分类',
                    icon: 'Menu'
                }
            },
            {
                path: '/timeLine',
                component: () => import('@/views/timeLine/index.vue'),
                name: 'timeLine',
                meta: {
                    title: '时间轴',
                    icon: 'Timer'
                }
            },
            {
                path: '/daily',
                component: () => import('@/views/daily/index.vue'),
                name: 'Daily',
                meta: {
                    title: '日常',
                    icon: 'Sunny'
                }
            },
            {
                path: '/friendLink',
                component: () => import('@/views/friendLink/index.vue'),
                name: 'friendLink',
                meta: {
                    title: '友链',
                    icon: 'Connection'
                }
            },
            {
                path: '/message',
                component: () => import('@/views/message/index.vue'),
                name: 'Message',
                meta: {
                    title: '留言板',
                    icon: 'Comment'
                }
            },
            {
                path: '/article',
                component: () => import('@/views/article/index.vue'),
                name: 'Article',
                meta: {
                    
                }
            },
        ]
    },
    {
        path: '/userinfo',
        component: () => import('@/views/userinfo/index.vue'),
        name: 'userinfo',
        meta: {
            name: "个人中心"
        }
    },
    
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
    }
]