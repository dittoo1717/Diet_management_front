import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import ResetPassword from '../components/ResetPassword.vue'

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