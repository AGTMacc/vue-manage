import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/views/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: "/", redirect: '/home' },
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/views/home')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../components/views/user')
        },
        {
          path: '/mall',
          name: 'mall',
          component: () => import('../components/views/mall')
        },
        {
          path: '/page1',
          name: 'page1',
          component: () => import('../components/views/other/pageOne.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('../components/views/other/pageTwo.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/views/login/login.vue'),
    }
  ]
})
