export const constantRouter = [
    {
        path: '/',
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
        path:'/timeLine',
        component: () => import('@/views/timeLine/index.vue'),
        name:'timeLine',
        meta: {
            title: '时间轴',
            icon: 'Timer'
        }
    },
    
    {
        path: '/photoAlbum',
        component: () => import('@/views/photoAlbum/index.vue'),
        name: 'photoAlbum',
        meta: {
            title: '相册',
            icon: 'PictureFilled'
        }
    },
    {
        path: '/messageBoard',
        component: () => import('@/views/messageBoard/index.vue'),
        name: 'messageBoard',
        meta: {
            title: '留言板',
            icon: 'Comment'
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
        path: '/profile',
        component: () => import('@/views/profile/index.vue'),
        name: 'profile',
        meta: {
            title: '资源导航',
            icon: 'Collection'
        }
    },
    // {
    //     path: '/login',
    //     component: () => import('@/views/login/index.vue'),
    //     name: 'login',
    //     meta: {
    //         title: '登录',
    //         icon: 'Avatar'
    //     }
    // },
]