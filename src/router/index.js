import { createRouter, createWebHistory } from 'vue-router'
import { myStore } from '@/stores/counter'
import MyHomeView from '@/views/MyHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyHomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/random-show',
      name: 'random_show',
      component: () => import('@/views/RandomShowView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/liked-shows',
      name: 'liked_shows',
      component: () => import('@/views/LikedShowView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/history',
      name: 'history',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/HistoryView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:catchAll(.*)",
      redirect: '/',
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = myStore()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.isLoggedIn) {
      next({ name: 'about' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
