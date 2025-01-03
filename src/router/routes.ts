import Layout from "@/Layout/index.tsx"
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
                component: () => import('@/views/home/index.tsx'),
                name: 'home',
                meta: {
                    title: '首页',
                    show: true,
                    icon: 'HomeFilled'
                }
            },
            {
                path: '/articleList',
                component: () => import('@/views/articleList/index'),
                name: 'articleList',
                meta: {
                    title: '文章',
                    show: true,
                    icon: 'Tickets'
                }
            },
            {
                path: '/daily',
                component: () => import('@/views/daily/index.vue'),
                name: 'daily',
                meta: {
                    title: '日常',
                    show: true,
                    icon: 'Sunny'
                }
            },
            {
                path: '/friendLink',
                component: () => import('@/views/friendLink/index.vue'),
                name: 'friendLink',
                meta: {
                    title: '友链',
                    show: true,
                    icon: 'Connection'
                }
            },
            {
                path: '/message',
                component: () => import('@/views/message/index.tsx'),
                name: 'message',
                meta: {
                    title: '留言板',
                    show: true,
                    icon: 'Comment'
                }
            },
            {
                path: '/article',
                component: () => import('@/views/article/index.vue'),
                name: 'article',
                meta: {
                    show: false,
                }
            },
        ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: "/home", },
]