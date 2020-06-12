import axios from '../store/axios'

export default {
  addItemToSale ({ commit, dispatch, rootState }, { newSale, action, currentQuantity }) {
    // alert('Product id is: ' + newSale.product.id)
    // alert('Price is: ' + newSale.price.price + ', quantity is: ' + newSale.quantity)
    const data = {
      productid: newSale.product.id,
      quantity: newSale.quantity,
      price: newSale.price,
      date: newSale.date,
      customerid: 1, // newSale.customer.id,
      saleid: null,
      creator: rootState.user.user.email
    }
    return axios.post('/sales/', data)
      .then(response => {
        // alert(response.data.status)
        if (response.data.status !== 'Failure') {
          commit('ADD_SALE_TO_DAYSALES', { newSale: response.data.daysale, action, currentQuantity })
        } else if (response.data.status === 'Failure') {
          // alert('In addItemToSale, ypu can create sale only in current day')
          dispatch('showSnackBarMessage', { message: response.data.message })
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  },
  loadDaySales ({ state, commit }, { year, month, day }) {
    return axios.get('/' + year + '/' + month + '/' + day + '/sales/')
      .then(response => {
        commit('SET_DAYSALES', response.data)
      })
  },
  getMonthSales ({ commit }, { currentYear, currentMonth }) {
    // alert('In getMonthSales')
    axios.get(currentYear.value + '/' + currentMonth.value + '/monthsales/')
      .then(response => {
        // alert('In getMonthSales response, monthSales Received ' + response.data.monthsales.length)
        commit('SET_MONTH_SALES', response.data.monthsales)
      })
  }
}
