import Vue from 'vue'
import Vuex from 'vuex'

import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

// const baseURL = '//10.191.203.152:8000/bizops'
// const baseURL = '//192.168.1.103:8000/bizops'
// const baseURL = '//192.168.43.6:8000/bizops'
const baseURL = '//165.227.94.31:8000/bizops'
const axios = require('axios').default
axios.defaults.baseURL = baseURL

export default new Vuex.Store({
  state: {
    currentDate: null,
    units: [],
    groups: [
      {
        id: 63,
        description: 'salesman_group',
        details: 'Group of salesmen',
        authorizations: []
      },
      {
        id: 64,
        description: 'manager_group',
        details: 'Group of managers',
        authorizations: []
      }
    ],
    models: [
      {
        title: 'Sale'
      },
      {
        title: 'User'
      },
      {
        title: 'Authorization'
      },
      {
        title: 'Group'
      },
      {
        title: 'Price'
      },
      {
        title: 'Product'
      },
      {
        title: 'Customer'
      }
    ],
    savedUser: {},
    newUser: {
      id: null,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      authorizations: [],
      groups: []
    },
    blankUser: {
      id: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      authorizations: [],
      groups: []
    },
    users: [
      // {
      //   id: null,
      //   username: 'joy',
      //   password: 'allow',
      //   firstname: 'Joy',
      //   lastname: 'Okunola',
      //   email: 'joy@favychos.com',
      //   phonenumber: null,
      //   authorizations: [],
      //   groups: []
      // },
      // {
      //   id: 'olamide',
      //   username: 'olamide',
      //   password: 'allow',
      //   firstname: 'Olamide',
      //   lastname: 'Okunola',
      //   email: 'olamide@favychos.com',
      //   phonenumber: '08023719137',
      //   authorizations: [
      //     {
      //       id: -4,
      //       description: 'sale_auth',
      //       model: 'Sale',
      //       create: true,
      //       edit: true,
      //       view: true,
      //       delete: true,
      //       added: true,
      //       status: 'changed'
      //     },
      //     {
      //       model: 'User',
      //       create: true,
      //       edit: true,
      //       view: true,
      //       delete: true,
      //       status: 'changed',
      //       description: 'user_auth'
      //     }
      //   ],
      //   groups: [
      //     {
      //       id: -4,
      //       description: 'manager_group',
      //       details: '',
      //       added: true,
      //       authorizations: [
      //         {
      //           id: -4,
      //           description: 'price_auth',
      //           model: 'Price',
      //           create: true,
      //           edit: true,
      //           view: true,
      //           delete: true,
      //           added: true
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   id: 'testu',
      //   username: 'testu',
      //   password: 'allow',
      //   firstname: 'tufn',
      //   lastname: 'tuln',
      //   email: 'tufn@mail.com',
      //   phonenumber: '08231231',
      //   authorizations: [
      //     {
      //       id: -4,
      //       description: 'user_auth',
      //       model: 'User',
      //       create: false,
      //       edit: true,
      //       view: true,
      //       delete: true,
      //       added: true,
      //       status: 'changed'
      //     }
      //   ],
      //   groups: [
      //     {
      //       id: -4,
      //       description: 'manager_group',
      //       details: '',
      //       added: true,
      //       authorizations: [
      //         {
      //           id: -4,
      //           description: 'price_auth',
      //           model: 'Price',
      //           create: true,
      //           edit: true,
      //           view: true,
      //           delete: true,
      //           added: true
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   id: 'unnew',
      //   username: 'unnew',
      //   password: 'allow',
      //   firstname: 'unfn',
      //   lastname: 'unln333',
      //   email: 'unfn@mail.com',
      //   phonenumber: '03232121',
      //   authorizations: [
      //     {
      //       id: -4,
      //       description: 'price_auth',
      //       model: 'Price',
      //       create: true,
      //       edit: true,
      //       view: true,
      //       delete: true,
      //       added: true
      //     }
      //   ],
      //   groups: [
      //     {
      //       id: -4,
      //       description: 'manager_group',
      //       details: '',
      //       added: true,
      //       authorizations: [
      //         {
      //           id: -4,
      //           description: 'price_auth',
      //           model: 'Price',
      //           create: true,
      //           edit: true,
      //           view: true,
      //           delete: true,
      //           added: true
      //         }
      //       ]
      //     }
      //   ]
      // }
    ],
    currentDateYYYYMMDD: '',
    monthSales: [],
    contextualNavMenuItems: [],
    snackBar: {
      state: false,
      text: '--'
    },
    productGroups: [
      { name: 'Bread Loaf' },
      { name: 'Bread Sliced' },
      { name: 'Bread Special' },
      { name: 'Pastries' }
    ],
    products: [
      // {
      //   id: 1,
      //   group: 'Bread Loaf',
      //   name: '800g Loaf Bread',
      //   title: '800g Loaf Bread',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '350',
      //   multiplePrices: false,
      //   prices: [{ date: '2020-01-01', price: 350, active: true }, { date: '2020-04-23', price: 400, active: false }],
      //   unit: { short: 'pcs', long: 'pieces' },
      //   units: [{ short: 'pcs', long: 'pieces' }]
      // },
      // {
      //   id: 2,
      //   group: 'Bread Loaf',
      //   name: '600g Loaf Bread',
      //   title: '600g Loaf Bread',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '300',
      //   multiplePrices: false,
      //   prices: [{ date: '2020-01-01', price: 300, active: true }, { date: '2020-04-23', price: 225, active: false }],
      //   unit: { short: 'pcs', long: 'pieces' },
      //   units: [{ short: 'pcs', long: 'pieces' }]
      // },
      // {
      //   id: 3,
      //   group: 'Bread Loaf',
      //   name: '400g Loaf Bread',
      //   title: '400g Loaf Bread',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '250',
      //   multiplePrices: false,
      //   prices: [],
      //   unit: { short: 'pcs', long: 'pieces' },
      //   units: [{ short: 'pcs', long: 'pieces' }]
      // },
      // {
      //   id: 4,
      //   group: 'Bread Sliced',
      //   name: '800g Sliced Bread',
      //   title: '800g Sliced Bread',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '350',
      //   multiplePrices: false,
      //   prices: [],
      //   unit: { short: 'pcs', long: 'pieces' },
      //   units: [{ short: 'pcs', long: 'pieces' }]
      // },
      // {
      //   id: 5,
      //   group: 'Bread Sliced',
      //   name: '600g Sliced Bread',
      //   title: '600g Sliced Bread',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '300',
      //   multiplePrices: false,
      //   prices: [],
      //   unit: { short: 'pcs', long: 'pieces' },
      //   units: [{ short: 'pcs', long: 'pieces' }]
      // },
      // {
      //   id: 6,
      //   group: 'Bread Sliced',
      //   name: '400g Sliced Bread',
      //   title: '400g Sliced Bread',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '250',
      //   multiplePrices: false,
      //   prices: [],
      //   unit: { short: 'pcs', long: 'pieces' },
      //   units: [{ short: 'pcs', long: 'pieces' }]
      // },
      // {
      //   id: 7,
      //   group: 'Pastries',
      //   name: '70g x 50 pcs Donuts',
      //   title: '70g x 50 pcs Donuts',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '2000',
      //   multiplePrices: false,
      //   prices: [{ date: '2020-01-01', price: 1800, active: true }, { date: '2020-04-23', price: 2000, active: false }],
      //   unit: { short: 'ctns', long: 'cartons' },
      //   units: [
      //     { short: 'pcs', long: 'pieces' },
      //     { short: 'ctns', long: 'cartons' }
      //   ]
      // },
      // {
      //   id: 8,
      //   group: 'Bread Special',
      //   name: '600g Coconut Bread',
      //   title: '600g Coconut Bread',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   price: '400',
      //   multiplePrices: false,
      //   prices: [],
      //   unit: { short: 'pcs', long: 'pieces' },
      //   units: [
      //     { short: 'pcs', long: 'pieces' }
      //   ]
      // }
    ],
    newProduct: {
      id: 0,
      group: '',
      name: '',
      title: '',
      date: {
        year: 0,
        month: 0,
        day: 0
      },
      price: '',
      multiplePrices: false,
      prices: [],
      unit: {},
      units: []
    },
    editProduct: {
      id: 0,
      group: '',
      name: '',
      title: '',
      date: {
        year: 0,
        month: 0,
        day: 0
      },
      price: '',
      multiplePrices: false,
      prices: [],
      unit: {},
      units: []
    },
    daySales: [
      // {
      //   id: 256,
      //   product: {
      //     id: 2,
      //     group: 'Bread Loaf',
      //     name: '600g Loaf Bread',
      //     title: '600g Loaf Bread',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '300',
      //     multiplePrices: false,
      //     prices: [],
      //     unit: { short: 'pcs', long: 'pieces' },
      //     units: [{ short: 'pcs', long: 'pieces' }]
      //   },
      //   quantity: 20,
      //   price: 200,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 2,
      //     name: 'Mummy Mariam',
      //     title: 'Mummy Mariam',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'olamide@favychos.com'
      // },
      // {
      //   id: 257,
      //   product: {
      //     id: 1,
      //     group: 'Bread Loaf',
      //     name: '800g Loaf Bread',
      //     title: '800g Loaf Bread',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '200',
      //     multiplePrices: false,
      //     prices: [],
      //     unit: { short: 'pcs', long: 'pieces' },
      //     units: [{ short: 'pcs', long: 'pieces' }]
      //   },
      //   quantity: 2,
      //   price: 300,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 1,
      //     name: 'Mallam LSDPC',
      //     title: 'Mallam LSDPC',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'joy@favychos.com'
      // },
      // {
      //   id: 258,
      //   product: {
      //     id: 1,
      //     group: 'Bread Sliced',
      //     name: '800g Sliced Bread',
      //     title: '800g Sliced Bread',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '200',
      //     multiplePrices: false,
      //     prices: [],
      //     unit: { short: 'pcs', long: 'pieces' },
      //     units: [{ short: 'pcs', long: 'pieces' }]
      //   },
      //   quantity: 2,
      //   price: 300,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 1,
      //     name: 'Mallam LSDPC',
      //     title: 'Mallam LSDPC',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'joy@favychos.com'
      // },
      // {
      //   id: 259,
      //   product: {
      //     id: 1,
      //     group: 'Bread Sliced',
      //     name: '400g Sliced Bread',
      //     title: '400g Sliced Bread',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '200',
      //     multiplePrices: false,
      //     prices: [],
      //     unit: { short: 'pcs', long: 'pieces' },
      //     units: [{ short: 'pcs', long: 'pieces' }]
      //   },
      //   quantity: 2,
      //   price: 300,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 1,
      //     name: 'Mallam LSDPC',
      //     title: 'Mallam LSDPC',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'joy@favychos.com'
      // },
      // {
      //   id: 260,
      //   product: {
      //     id: 1,
      //     group: 'Bread Sliced',
      //     name: '400g Sliced Bread',
      //     title: '400g Sliced Bread',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '200',
      //     multiplePrices: false,
      //     prices: [],
      //     unit: { short: 'pcs', long: 'pieces' },
      //     units: [{ short: 'pcs', long: 'pieces' }]
      //   },
      //   quantity: 2,
      //   price: 300,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 1,
      //     name: 'Mallam LSDPC',
      //     title: 'Mallam LSDPC',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'joy@favychos.com'
      // },
      // {
      //   id: 261,
      //   product: {
      //     id: 1,
      //     group: 'Bread Sliced',
      //     name: '400g Sliced Bread',
      //     title: '400g Sliced Bread',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '200',
      //     multiplePrices: false,
      //     prices: [],
      //     unit: { short: 'pcs', long: 'pieces' },
      //     units: [{ short: 'pcs', long: 'pieces' }]
      //   },
      //   quantity: 2,
      //   price: 300,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 1,
      //     name: 'Mallam LSDPC',
      //     title: 'Mallam LSDPC',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'joy@favychos.com'
      // },
      // {
      //   id: 262,
      //   product: {
      //     id: 1,
      //     group: 'Bread Sliced',
      //     name: '600g Sliced Bread',
      //     title: '600g Sliced Bread',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '200',
      //     multiplePrices: false,
      //     prices: [],
      //     unit: { short: 'pcs', long: 'pieces' },
      //     units: [{ short: 'pcs', long: 'pieces' }]
      //   },
      //   quantity: 2,
      //   price: 300,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 1,
      //     name: 'Mallam LSDPC',
      //     title: 'Mallam LSDPC',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'joy@favychos.com'
      // },
      // {
      //   id: 263,
      //   product: {
      //     id: 1,
      //     group: 'Doughnuts',
      //     name: '70g x 50 pcs Donuts',
      //     title: '70g x 50 pcs Donuts',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     },
      //     price: '2000',
      //     multiplePrices: true,
      //     prices: [{ date: '2020-01-02', price: 1800, active: true }, { date: '2020-04-23', price: 2000, active: true }],
      //     unit: { short: 'ctns', long: 'cartons' },
      //     units: [
      //       { short: 'pcs', long: 'pieces' },
      //       { short: 'ctns', long: 'cartons' }
      //     ]
      //   },
      //   quantity: 2,
      //   price: 2000,
      //   currency: 'NGN',
      //   date: {
      //     year: 2020,
      //     month: 4,
      //     day: 15
      //   },
      //   customer: {
      //     id: 1,
      //     name: 'Mallam LSDPC',
      //     title: 'Mallam LSDPC',
      //     date: {
      //       year: 2020,
      //       month: 4,
      //       day: 15
      //     }
      //   },
      //   lastSaleTime: '8:14am',
      //   creator: 'joy@favychos.com'
      // }
    ],
    customers: [
      {
        id: 1,
        name: 'Mallam LSDPC',
        title: 'Mallam LSDPC',
        date: {
          year: 2020,
          month: 4,
          day: 15
        }
      },
      {
        id: 2,
        name: 'Mummy Mariam',
        title: 'Mummy Mariam',
        date: {
          year: 2020,
          month: 4,
          day: 15
        }
      }
    ],
    showNav: true,
    user: null
  },
  mutations: {
    setContextualNavMenuItems (state, contextualNavMenuItems) {
      // alert(contextualNavMenuItems.length)
      state.contextualNavMenuItems = contextualNavMenuItems
    },
    showSnackBar (state, value) {
      state.snackBar.state = value
      // alert(value.text)
      Object.assign(state.snackBar, value)
    },
    addSaleToDaySales (state, { newSale, action, currentQuantity }) {
      // alert('newSale Product: ' + newSale.product.name)
      // alert('newSale Quantity: ' + newSale.quantity)
      // alert('items in daySale: ' + state.daySales.length)
      newSale.quantity = Number(newSale.quantity)
      var value = {}
      // alert('In mutation action is ' + action)
      // alert('In mutation currentQuantity is ' + currentQuantity)
      if (action === 'add') {
        // alert('action is add')
        state.daySales.push(newSale)
        value = {
          state: true,
          text: newSale.quantity + ' unit(s) of ' + newSale.product.name + ' added to sales'
        }
      } else {
        // alert('action is remove')
        if (currentQuantity > 0) {
          state.daySales.push(newSale)
          value = {
            state: true,
            text: 1 + ' unit(s) of ' + newSale.product.name + ' removed from sales'
          }
        } else {
          value = {
            state: true,
            text: 'No item in sale to remove from'
          }
        }
      }
      this.commit('showSnackBar', value)
      // alert('items in daySale: ' + state.daySales.length)
    },
    SET_USER_DATA (state, userData) {
      const decoded = jwtDecode(userData.token)
      state.user = decoded.user
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${
        userData.token
      }`
    },
    CLEAR_USER_DATA (state) {
      // state.user = null
      localStorage.removeItem('user')
      // alert('In CLEAR_USER_DATA')
      // axios.defaults.headers.common.Authorization = null
      location.reload()
    },
    SET_NEW_PRODUCT (state, newProduct) {
      state.newProduct = newProduct
    },
    SET_UNITS (state, loadedUnits) {
      state.units = loadedUnits
    },
    SET_PRODUCTS (state, loadedProducts) {
      // const re = / /gi
      const productsWithImages = loadedProducts.map((product) => {
        // product.imgsrc = require('../assets/images/' + product.name.replace(re, '_') + '.png')
        product.imgsrc = baseURL + '/productimage/' + product.id + '.png' // product.name.replace(re, '_') + '.png'
        product.activePrices = product.prices.filter((price) => price.active === true)
        return product
      })
      state.products = productsWithImages
    },
    SET_DAYSALES (state, daySales) {
      // alert('In Set Day SAles: ' + daySales.length)
      state.daySales = daySales
    },
    SET_CURRENT_DATE (state, currentDate) {
      state.currentDate = currentDate
    },
    SET_MONTH_SALES (state, monthSales) {
      state.monthSales = monthSales
    },
    SET_USERS (state, users) {
      state.users = users
      // alert('In SET_USERS number if users is: ' + users.length)
    },
    SET_SAVED_USER (state, savedUser) {
      state.savedUser = savedUser
    }
  },
  actions: {
    addItemToSale ({ commit, state }, { newSale, action, currentQuantity }) {
      // temporary action: update daySale
      // first get new id
      // alert('In vuex, addItemToSale action is ' + action)
      // const ids = state.daySales.map((daySale) => daySale.id)
      // ids.sort()
      // const newId = ids[ids.length - 1] + 1
      // // alert(newId)
      // newSale.id = newId
      // alert('In addOneItemToSale, username is ' + state.user)
      // alert('In addOneItemToSale, newSale.quantity is ' + newSale.quantity)
      const data = {
        productid: newSale.product.id,
        quantity: newSale.quantity,
        price: newSale.price,
        date: newSale.date,
        customerid: 1, // newSale.customer.id,
        saleid: null,
        creator: state.user.email
      }
      // alert(data.productid)
      // alert('In addOneItemToSale, about to post')
      axios.post('/sales/', data)
        .then(response => {
          // alert('In response')
          commit('addSaleToDaySales', { newSale: response.data.daysale, action, currentQuantity })
          // commit('updateDaySales', { daySales: response.data.daysales })
        })

      // alert(newSale.quantity)

      // call addNewSale to create the sale on the backend and reload daySales
    },
    loadDaySales ({ state, commit }, { year, month, day }) {
      return axios.get('/' + year + '/' + month + '/' + day + '/sales/')
        .then(response => {
          commit('SET_DAYSALES', response.data)
        })
    },
    loadUsers ({ state, commit }) {
      // if(state.user.isAuthenticated){ // && state.user.authorizations.sales.includes('create') ){
      // alert("In loadUsers, user is authenticated")
      axios({
        method: 'get',
        url: '/users/'
      })
        .then(function (response) {
          // alert('In loadUsers, number if users is: ' + response.data.users.length)
          commit('SET_USERS', response.data.users)
        })
        .catch(err => alert(err))
      // }
    },
    login ({ commit, dispatch }, credentials) {
      return axios
        .post('/login/', credentials)
        .then(({ data }) => {
          // alert('In login!' + data.username)
          // console.log('------user data is: ', data)
          commit('SET_USER_DATA', data)
          // dispatch('loadUsers')
        })
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    },
    uploadProductPhoto ({ commit }, { payload, id }) {
      // alert('In uploadPhoto')
      const fd = new FormData()
      fd.append('image', payload.selectedFile)
      fd.append('name', payload.name)
      fd.append('group', payload.group)
      fd.append('id', id)
      // alert(id)
      axios.post('/uploadproductimage/' + id, fd)
        .then(response => {
          console.log(response)
        })
    },
    createProduct ({ dispatch, commit }, payload) {
      // alert(payload.name)
      const data = {
        name: payload.name,
        group: payload.group,
        units: payload.units
      }
      axios.post('/products/', data)
        .then(response => {
          commit('SET_NEW_PRODUCT', response.data)
          // alert('id is: ' + response.data.id)
          const id = response.data.id
          dispatch('uploadProductPhoto', { payload, id })

          dispatch('loadProducts')
        })
    },
    updateProduct ({ dispatch, commit }, payload) {
      // alert('In updateProduct, id is: ' + payload.id)
      const data = {
        name: payload.name,
        group: payload.group,
        units: payload.units
      }
      axios.put('/products/' + payload.id, data)
        .then(response => {
          commit('SET_NEW_PRODUCT', response.data)
          // alert('id is: ' + response.data.id)
          const id = response.data.id
          if (payload.selectedFile != null) {
            dispatch('uploadProductPhoto', { payload, id })
          }
          dispatch('loadProducts')
        })
    },
    deleteProduct ({ commit }, { id }) {
      axios.delete('/products/' + id)
        .then(response => {
          commit('showSnackBar', {
            state: true,
            text: response.data.product.name + ' deleted!'
          })
          commit('SET_PRODUCTS', response.data.products)
        })
    },
    loadUnits ({ commit }) {
      axios.get('/units/')
        .then(response => {
          // alert('Units loaded! ' + response)
          commit('SET_UNITS', response.data)
        })
    },
    loadProducts ({ commit }) {
      axios.get('/products/')
        .then(response => {
          // alert('Units receieved! ' + response)
          commit('SET_PRODUCTS', response.data)
        })
    },
    savePrices ({ commit }, { id, prices, defaultPrice }) {
      const data = { prices, defaultPrice }
      axios.post('/products/' + id + '/addprices/', data)
        .then(response => {
          commit('SET_PRODUCTS', response.data.products)
        })
    },
    showSnackBarMessage ({ commit }, { message }) {
      const value = {
        state: true,
        text: message
      }
      commit('showSnackBar', value)
    },
    getMonthSales ({ commit }, { currentYear, currentMonth }) {
      // alert('In getMonthSales')
      axios.get(currentYear.value + '/' + currentMonth.value + '/monthsales/')
        .then(response => {
          // alert('In getMonthSales response, monthSales Received ' + response.data.monthsales.length)
          commit('SET_MONTH_SALES', response.data.monthsales)
        })
    },
    saveUser ({ state, dispatch, commit }) {
      if (state.newUser.id == null || state.newUser.id === '') {
        // Save New User
        // alert('In saveNewsuser phone number is ' + state.newUser.phonenumber)
        return axios.post('/users/', state.newUser)
          .then(response => {
            commit('SET_SAVED_USER', response.data.user)
            // alert('In saveNewsuser username is ' + response.data.user.username)
            dispatch('loadUsers')
          })
      } else {
        // Save Existing User
        return axios.put('/users/' + state.newUser.username, state.newUser)
          .then(response => {
            commit('SET_SAVED_USER', response.data.user)
            // alert('In saveNewsuser Existing username is ' + response.data.user.username)
            dispatch('loadUsers')
          })
      }
    }
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    },
    monthSaleDailyTotals (state) {
      // {
      //   totalAmount: '15000',
      //   date: '2020-05-01'
      // },
      // {
      //   totalAmount: '35000',
      //   date: '2020-05-02'
      // },
      // {
      //   totalAmount: '10000',
      //   date: '2020-05-03'
      // }

      return state.monthSales.map((daySales) => {
        var totalAmount = 0
        var date = ''

        if (daySales.length > 0) {
          const daySaleQtyAndPrice = daySales.map((sale) => {
            return {
              quantity: sale.quantity,
              price: Number(sale.product.price.price)
            }
          })

          const totalAmounts = daySaleQtyAndPrice.map((qtyAndPrice) => Number(qtyAndPrice.quantity) * Number(qtyAndPrice.price))

          totalAmount = totalAmounts.reduce((total, amount) => total + amount)

          date = daySales[0].date.year + '-' + daySales[0].date.month + '-' + daySales[0].date.day
        }

        return { totalAmount, date }
      })
    },
    loggedInUser (state, getters) {
      return getters.loggedIn ? state.user.username : null
    }
  },
  modules: {
  }
})
