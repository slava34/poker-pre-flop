import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import TrainerPage from '../pages/TrainerPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/trainer',
      name: 'trainer',
      component: TrainerPage,
    },
  ],
})

export default router
