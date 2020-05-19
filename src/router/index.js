import Vue from 'vue'
import VueRouter from 'vue-router'
import DaySales from '../views/DaySales.vue'
import NProgress from 'nprogress'
import store from '@/store/index'

import { useDateUtilities } from '../utilities/dateUtils'
import { AuthorizationService } from '../router/authorizationService'
const authorizationService = AuthorizationService

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'DaySales',
    component: DaySales,
    meta: { requiresAuth: true },
    beforeEnter (to, from, next) {
      const state = store.state
      const { year, monthCorrected, day, currentDate } = useDateUtilities({ state })

      store.commit('SET_CURRENT_DATE', currentDate)

      store.dispatch('loadProducts')

      store.dispatch('loadDaySales', { year, month: monthCorrected, day })
        .then(() => {
          next()
        })
    }
  },
  {
    path: '/products',
    name: 'Products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue'),
    children: [
      {
        path: 'productlist',
        name: 'ProductList',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductList.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'Product',
            action: 'view'
          }
        },
        props: true,
        beforeEnter (to, from, next) {
          store.commit('setContextualNavMenuItems', store.state.contextualNavMenuItems)

          store.dispatch('loadProducts')
            .then(() => {
              next()
            })
        }
      },
      {
        path: 'new',
        name: 'NewProduct',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductNew.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'Product',
            action: 'create'
          }
        }
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:productname',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    children: [
      {
        path: 'details',
        name: 'ProductDetails',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductDetails.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'Product',
            action: 'view'
          }
        }
      },
      {
        path: 'edit',
        name: 'EditProduct',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductEdit.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'Product',
            action: 'edit'
          }
        }
      },
      {
        path: 'prices',
        name: 'ProductPrices',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductPrices.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'Price',
            action: 'edit'
          }
        }
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
    children: [
      {
        path: 'userlist',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserList.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'User',
            action: 'view'
          }
        }
      },
      {
        path: 'new',
        name: 'NewUser',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserNew.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'User',
            action: 'create'
          }
        }
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:username',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
    children: [
      // {
      //   path: 'profile',
      //   name: 'UserProfile',
      //   component: () => import(/* webpackChunkName: "about" */ '../views/UserProfile.vue')
      // },
      {
        path: 'edit',
        name: 'EditUser',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserEdit.vue'),
        meta: {
          requiresAuth: true,
          requiredAuthorization: {
            model: 'User',
            action: 'edit'
          }
        }
      }
    ],
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  // alert(!loggedIn)
  // alert(to.matched.some(record => record.meta.requiresAuth))

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    // alert('In not loggedIn!')
    next('/login')
  } else if (to.matched.some(record => record.meta.requiredAuthorization) && !authorizationService.checkAuth(to.matched.find(record => record.meta.requiredAuthorization).meta.requiredAuthorization)) {
    alert('You not authorized to carry out this action!')
    next(false)
  } else {
    // alert('In beforeEach, final is ')
    NProgress.start()
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
