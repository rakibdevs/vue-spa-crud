import { createRouter, createWebHistory } from 'vue-router'
import Home         from '../views/Home.vue';
import NProgress    from 'nprogress';

import Register     from '../views/auth/Register.vue';
import Login        from '../views/auth/Login.vue';

import auth from '../auth';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            disableIfLoggedIn: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            disableIfLoggedIn: true
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/products/ProductList.vue'),
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '/products/create',
        name: 'Product Create',
        component: () => import('../views/products/ProductCreate.vue'),
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '/products/edit/:id',
        name: 'ProductEdit',
        component: () => import('../views/products/ProductEdit.vue'),
        meta: { 
            requiresAuth: true
        }
    }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (auth.getters.isLoggedIn && localStorage.getItem('token') != null) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

export default router
