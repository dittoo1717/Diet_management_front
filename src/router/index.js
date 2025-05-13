import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import ResetPassword from '../components/ResetPassword.vue'
import routeMyinfo from '../components/routeMyinfo.vue'
import RouteMealDiary from '../components/routeMealDiary.vue'
import NutritionAnalyzer from '../components/routeNutritionAnalyzer.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/myinfo',
    name: 'Myinfo',
    component: routeMyinfo
  },
  {
    path: '/mealdiary',
    name: 'mealdiary',
    component: RouteMealDiary
  },
  {
    path: '/nutritionanalyzer',
    name: 'nutritionAnalyzer',
    component: NutritionAnalyzer
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('isAuthenticated')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 