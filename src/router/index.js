import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'patient',
            component: () => import('../views/PatientView.vue')
        }, {
            path: '/inquiry',
            name: 'inquiry',
            component: () => import('../views/InquiryView.vue')
        }
    ]
})

export default router
