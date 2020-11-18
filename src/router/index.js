import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/start',
    name: 'Start',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/annotate',
    name: 'Annotate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Annotate.vue')
  },
  {
    path: '/AnnotatePlain',
    name: 'AnnotatePlain',
    component: () => import(/* webpackChunkName: "about" */ '../views/AnnotatePlain.vue')
  },
  {
    path: '/Finish',
    name: 'Finish',
    component: () => import(/* webpackChunkName: "about" */ '../views/Finish.vue')
  },
  {
    path: '/survey',
    name: 'Survey',
    component: () => import(/* webpackChunkName: "about" */ '../views/Survey.vue')
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tutorial.vue')
  },
  {
    path: '/scenario',
    name: 'Scenario',
    component: () => import(/* webpackChunkName: "about" */ '../views/Scenario.vue')
  },
  {
    path: '/debriefing',
    name: 'Debriefing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Debriefing.vue')
  },
  // {
  //   path: '/survey',
  //   name: 'Survey',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Annotate.vue')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
