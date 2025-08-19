import { createWebHistory, createRouter } from 'vue-router'
import Index from '@/Pages/frontend/index.vue'
import Login from '@/Pages/frontend/login.vue'
import Signup from '@/Pages/frontend/signup.vue'
import Products from '@/Pages/frontend/products.vue'
import ProductDetail from '@/Pages/frontend/productdetail.vue'
import NotFound from '@/Pages/frontend/notfound.vue'
import dashboard from '@/Pages/backend/dashboard.vue'

const routes = [
  { path: '/', name: 'index', component: Index },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/products', name: 'products', component: Products },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  { path: '/dashboard', name: 'dashboard', component: dashboard },
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const publicPaths = ['/', '/login', '/signup', '/products'];

  if (publicPaths.includes(to.path) || to.path.startsWith('/products/')) {
    return next();
  }

  if (to.path === '/dashboard' && (!token || role !== 'admin')) {
    return next('/login');
  }

  if ((to.path === '/login' || to.path === '/signup') && token) {
    return role === 'admin' ? next('/dashboard') : next('/');
  }

  next();
});



export default router