import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/', // الصفحة الأساسية
    name: 'Signup',
    component: () => import('../views/signupview.vue') // الآن هي الصفحة الأولى
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Homeview.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/registerview.vue')
  },
  {
    path: '/404page',
    name: '404page',
    component: () => import('../views/404page.vue')
  },
  {
  path: '/Pharmacics',
  name: 'Pharmacics',
  component: () => import('../views/Pharmacicsview.vue')
},
{
  path: '/AddMedicines',
  name: 'AddMedicines',
  component: () => import('../views/AddMedicines.vue')
},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
