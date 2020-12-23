import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import SubBusiness from '../views/SubBusiness.vue'
import SubBusinessDetail from '../views/SubBusinessDetail.vue'
import Login from '../views/Login.vue'
// import OpportunityDetail from '../components/OpportunityDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/sub-business/:id",
    name: "SubBusinessDetail",
    component: SubBusinessDetail
  },
  {
    path: "/sub-business/",
    name: "SubBusiness",
    component: SubBusiness
  },
  {
    path: "/opportunity/",
    name: "OpportunityList",
    component: Home
  },
  {
    path: "/login/",
    name: "Login",
    component: Login
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 };
  }
})

export default router
