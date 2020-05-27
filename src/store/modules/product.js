
import ProductService from '../../services/ProductService'

export const state = {
  productGroups: [
    { name: 'Bread Loaf' },
    { name: 'Bread Sliced' },
    { name: 'Bread Special' },
    { name: 'Pastries' }
  ],
  products: [],
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
  units: []
}

export const mutations = {
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
      if (product.group === 'Pastries') {
        product.productType = 'Pastries'
      } else {
        product.productType = 'Bread'
      }
      product.imgsrc = ProductService.SET_IMAGE_URL(product)
      product.activePrices = product.prices.filter((price) => price.active === true)
      return product
    })
    state.products = productsWithImages
  }
}

export const actions = {
  uploadProductPhoto ({ commit }, { payload, id }) {
    // alert('In uploadPhoto')
    const fd = new FormData()
    fd.append('image', payload.selectedFile)
    fd.append('name', payload.name)
    fd.append('group', payload.group)
    fd.append('id', id)
    // alert(id)
    ProductService.uploadProductPhoto(id, fd)
  },
  createProduct ({ dispatch, commit }, payload) {
    return ProductService.createProduct({ dispatch, commit }, payload)
  },
  updateProduct ({ dispatch, commit }, payload) {
    return ProductService.updateProduct({ dispatch, commit }, payload)
  },
  deleteProduct ({ commit }, { id }) {
    return ProductService.deleteProduct({ commit }, { id })
  },
  loadUnits ({ commit }) {
    return ProductService.loadUnits({ commit })
  },
  loadProducts ({ commit }) {
    return ProductService.loadProducts({ commit })
  },
  savePrices ({ commit }, { id, prices, defaultPrice }) {
    return ProductService.savePrices({ commit }, { id, prices, defaultPrice })
  }
}

export const getters = {
  productNames: (state) => state.products.map((product) => product.name),
  productNamesFromProductType: (state) => (producttype) => {
    const productsFromProductType = state.products.filter((product) => producttype === product.productType)
    return productsFromProductType.map((product) => product.name)
  },
  getProductByName: (state) => (name) => state.products.find((product) => product.name === name),
  getProductPriceByName: (state, getters) => (name) => getters.getProductByName(name).price.price
}
