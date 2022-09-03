import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import( '../views/HomeView.vue' )
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import( '../views/SignInView.vue' )
    },
    {
        path: '/edit',
        name: 'edit',
        component: () => import( '../views/EditProfileView.vue' )
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import( '../views/SignUpView.vue' )
    }
]

const router = createRouter( {
    history: createWebHashHistory(),
    routes
} )

export default router
