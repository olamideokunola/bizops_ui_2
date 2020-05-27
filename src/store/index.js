import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user'
import * as product from '@/store/modules/product'
import * as sale from '@/store/modules/sale'
import * as production from '@/store/modules/production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    product,
    sale,
    production
  },
  state: {
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
      },
      {
        title: 'Production'
      }
    ],
    currentDate: null,
    currentDateYYYYMMDD: '',
    contextualNavMenuItems: [],
    snackBar: {
      state: false,
      text: '--'
    },
    showNav: true
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
    SET_CURRENT_DATE (state, currentDate) {
      state.currentDate = currentDate
    }
  },
  actions: {
    showSnackBarMessage ({ commit }, { message }) {
      const value = {
        state: true,
        text: message
      }
      commit('showSnackBar', value)
    }
  },
  getters: {
  }
})
