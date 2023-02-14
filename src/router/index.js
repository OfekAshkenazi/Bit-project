import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import contactIndex from '../pages/contact-index.vue'
import ContactDetails from '../pages/contact-details.vue'
import ContactEdit from '../pages/contact-edit.vue'
import Statistics from '../pages/statistics.vue'

const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/contact',
            component: contactIndex,
        },
        {
            path: '/contact/:_id',
            component: ContactDetails,
        },
        {
            path: '/contact/edit/:_id?',
            component: ContactEdit,
        },
        {
            path: '/statistics',
            component: Statistics,
        },
        {
            path: '/about',
            component: () => import('../pages/About.vue'),
        },
    ],
}
const router = createRouter(routerOptions)

export default router
