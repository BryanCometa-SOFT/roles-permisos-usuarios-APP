import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: HomeView
  },
  {
    path: '/permisos',
    name: 'permisos',
    component: () => import('../views/Permisos.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('../views/Usuarios.vue')
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('../views/Roles.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
