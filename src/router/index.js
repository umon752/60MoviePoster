import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Content.vue'),
      },
      {
        path: '/about',
        component: () => import('../views/About.vue'),
        meta: {
          title: 'About | 60 Movie Poster',
        },
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/Products.vue'),
        meta: {
          title: 'Posters | 60 Movie Poster',
        },
      },
      {
        path: '/product/:id',
        component: () => import('../views/Product.vue'),
        meta: {
          title: 'Poster Details | 60 Movie Poster',
        },
      },
      {
        path: '/contact',
        component: () => import('../views/Contact.vue'),
        meta: {
          title: 'Contact | 60 Movie Poster',
        },
      },
      {
        path: '/cart',
        component: () => import('../views/Cart.vue'),
        meta: {
          title: 'Cart | 60 Movie Poster',
        },
      },
      {
        path: '/order',
        component: () => import('../views/Order.vue'),
        meta: {
          title: 'Order | 60 Movie Poster',
        },
      },
      {
        path: '/payment/:id',
        component: () => import('../views/Payment.vue'),
        meta: {
          title: 'Payment | 60 Movie Poster',
        },
      },
      {
        path: '/complete/:id',
        component: () => import('../views/Complete.vue'),
        meta: {
          title: 'Checkout | 60 Movie Poster',
        },
      },
      {
        path: '/wishlist',
        component: () => import('../views/Wishlist.vue'),
        meta: {
          title: 'Wishlist | 60 Movie Poster',
        },
      },
      {
        path: '/faq',
        component: () => import('../views/Faq.vue'),
        meta: {
          title: 'FAQ | 60 Movie Poster',
        },
      },
      {
        path: '/shoppingGuide',
        component: () => import('../views/ShoppingGuide.vue'),
        meta: {
          title: 'Shopping Guide | 60 Movie Poster',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login/Login.vue'),
    meta: {
      title: 'Login | 60 Movie Poster',
    },
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard/Layout.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Dashboard/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Dashboard/Coupons.vue'),
      },
      {
        path: 'articles',
        component: () => import('../views/Dashboard/Articles.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/Error/Error.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active', // active 狀態，套用 .active
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
