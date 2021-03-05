import { createRouter, createWebHistory } from 'vue-router'
import Home         from '../views/Home.vue';
import NProgress    from 'nprogress';

import Register     from '../views/auth/Register.vue';
import Login        from '../views/auth/Login.vue';
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
            auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/products/ProductList.vue')
    },
    {
        path: '/products/create',
        name: 'Product Create',
        component: () => import('../views/products/ProductCreate.vue')
    },
    {
        path: '/products/edit/:id',
        name: 'ProductEdit',
        component: () => import('../views/products/ProductEdit.vue')
    }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
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
