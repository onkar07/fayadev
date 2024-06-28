import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Detailpagedt from '@/components/details/Detailpagedt.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/details/:data',
      name: 'details',
      component: Detailpagedt,
      props: true
    }
  ]
})
export default router
