import axios from '../store/axios'

export default {
  loadDayProductionBatches ({ commit }, { year, month, day }) {
    return axios.get('/' + year + '/' + month + '/' + day + '/productionbatches/')
      .then(response => {
        commit('SET_DAY_PRODUCTION_BATCHES', response.data.dayproductionbatches)
      })
  },
  saveProductionBatch ({ commit }, { producttype, batch }) {
    return axios.post('/productionbatches/', { producttype, batch })
      .then(response => {
        commit('SET_SAVED_PRODUCTION_BATCH', response.data.productionbatch)
        commit('SET_DAY_PRODUCTION_BATCHES', response.data.dayproductionbatches)
      })
  },
  updateProductionBatch ({ commit }, { producttype, batch }) {
    return axios.put('/productionbatches/' + batch.id, { producttype, batch })
      .then(response => {
        // commit('SET_SAVED_PRODUCTION_BATCH', response.data.productionbatch)
        commit('SET_DAY_PRODUCTION_BATCHES', response.data.dayproductionbatches)
      })
  }
}
