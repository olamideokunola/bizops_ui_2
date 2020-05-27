import axios from '../store/axios'

export default {
  SET_IMAGE_URL (product) {
    return axios.defaults.baseURL + '/productimage/' + product.id + '.png' // product.name.replace(re, '_') + '.png'
  },
  uploadProductPhoto (id, fd) {
    return axios.post('/uploadproductimage/' + id, fd)
      .then(response => {
        console.log(response)
      })
  },
  createProduct ({ dispatch, commit }, payload) {
    const data = {
      name: payload.name,
      group: payload.group,
      units: payload.units
    }
    return axios.post('/products/', data)
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
    return axios.put('/products/' + payload.id, data)
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
    return axios.delete('/products/' + id)
      .then(response => {
        commit('showSnackBar', {
          state: true,
          text: response.data.product.name + ' deleted!'
        })
        commit('SET_PRODUCTS', response.data.products)
      })
  },
  loadUnits ({ commit }) {
    return axios.get('/units/')
      .then(response => {
        // alert('Units loaded! ' + response)
        commit('SET_UNITS', response.data)
      })
  },
  loadProducts ({ commit }) {
    return axios.get('/products/')
      .then(response => {
        // alert('Units receieved! ' + response)
        commit('SET_PRODUCTS', response.data)
      })
  },
  savePrices ({ commit }, { id, prices, defaultPrice }) {
    const data = { prices, defaultPrice }
    return axios.post('/products/' + id + '/addprices/', data)
      .then(response => {
        commit('SET_PRODUCTS', response.data.products)
      })
  }
}
