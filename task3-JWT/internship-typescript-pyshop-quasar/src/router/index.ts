import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import( '../views/HomeView.vue' )
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( '../views/LoginView.vue' )
    },
    {
        path: '/edit',
        name: 'edit',
        component: () => import( '../views/EditProfileView.vue' )
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import( '../views/SigninView.vue' )
    }
]

const router = createRouter( {
    history: createWebHashHistory(),
    routes
} )

export default router
