import HomeView from '@/views/HomeView.vue'

export const menu = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/product/ListView.vue'),
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order/SimulatorView.vue'),
  },
    {
    path: '/support',
    name: 'support',
    component: () => import('../views/support/ContactView.vue'),
  },
    {
    path: '/summary',
    name: 'summary',
    component: () => import('../views/order/SummaryView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/user/ListView.vue'),
  },
    {
    path: '/admin/tickets',
    name: 'tickets',
    component: () =>  import('../views/admin/TicketListView.vue'),
  },
]

export const routes = [
  ...menu,
  {
    path: '/product/:reference',
    name: 'product-details',
    component: () => import('../views/product/DetailsView.vue'),
    props: true,
    children: [
      {
        path: 'specs',
        name: 'product-specs',
        component: () => import('../components/product/TheSpecs.vue'),
        props: true,
      },
      {
        path: 'reviews',
        name: 'product-reviews',
        component: () => import('../components/product/TheReviews.vue'),
        props: true,
      },
    ],
  }
]
