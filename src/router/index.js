import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 首页我们需要默认空路径重定向到 home 下，避免空页面
  {
    path: '/',
    name: 'home',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: {
      index: 1
    }
  },
  {
    path:'/user-setting',
    name:'user-setting',
    component: ()=>import('../views/UserSetting'),
    meta: {
      index: 2
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '../views/Login.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/product-list',
    name: '/product-list',
    component: () => import(/* webpackChunkName: "user" */ '../views/ProductList.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/product/:id',
    name: 'product',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductDetail.vue'),
  },
  {
    path: '/create-order',
    name: 'create-order',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "create-order" */ '../views/CreateOrder.vue'),
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "create-order" */ '../views/Order.vue'),
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "order-detail" */ '../views/OrderDetail.vue'),
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "address" */ '../views/Address.vue'),
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    meta: {
      index: 3
    },
    component: () => import(/* webpackChunkName: "address" */ '../views/AddressEdit.vue'),
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base:'/vuemall2',
  routes
})

export default router
