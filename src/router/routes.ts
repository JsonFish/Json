export const constantRouter = [
    {
        path: '/',
        component: () => import('@/views/Home/index.vue'),
        name: 'home',
    },
    {
        path:'/timeline',
        component: () => import('@/views/Timeline/index.vue'),
        name:'acticle'
    },

]