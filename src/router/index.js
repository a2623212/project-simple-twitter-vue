import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
  },
  {
    // 之後再更改
    path: '/reply',
    name: 'reply',
    component: () => import('../views/Reply.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
