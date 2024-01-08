import { createRouter, createWebHistory } from 'vue-router'
import ChatWindow from '@/views/ChatWindow.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'chat',
            component: ChatWindow
        },
        {
            path: '/setting',
            name: 'setting',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/SettingWindow.vue')
        }
    ]
})

export default router
