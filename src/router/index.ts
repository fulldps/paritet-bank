import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
    { path: '/business', name: 'business', component: () => import('@/views/BusinessView.vue') },
    { path: '/banks', name: 'banks', component: () => import('@/views/BanksView.vue') },
    { path: '/p2p', name: 'p2p', component: () => import('@/views/P2PView.vue') },
    { path: '/iparitet', name: 'iparitet', component: () => import('@/views/IParitetView.vue') },
    { path: '/erip', name: 'erip', component: () => import('@/views/EripView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
