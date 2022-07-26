import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import Characters from '@/views/Characters.vue' //@ nos deja dentro de src

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/episodes',
    name: 'episodes',
    component: () => import('../views/Episodes.vue')
  },
  {
    path: '/locations',
    name: 'locations',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Locations.vue')
  },
  {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/Characters.vue')//@ nos deja dentro de src
      //component: Characters,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
