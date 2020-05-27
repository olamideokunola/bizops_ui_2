import SaleService from '../../services/SaleService'

export const state = {
  monthSales: [],
  daySales: [],
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
  ]
}

export const mutations = {
  ADD_SALE_TO_DAYSALES (state, { newSale, action, currentQuantity }) {
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
  SET_DAYSALES (state, daySales) {
    // alert('In Set Day SAles: ' + daySales.length)
    state.daySales = daySales
  },
  SET_MONTH_SALES (state, monthSales) {
    state.monthSales = monthSales
  }
}

export const actions = {
  addItemToSale ({ commit, rootState }, { newSale, action, currentQuantity }) {
    return SaleService.addItemToSale({ commit, rootState }, { newSale, action, currentQuantity })
  },
  loadDaySales ({ state, commit }, { year, month, day }) {
    return SaleService.loadDaySales({ commit, state }, { year, month, day })
  },
  getMonthSales ({ commit }, { currentYear, currentMonth }) {
    return SaleService.getMonthSales({ commit }, { currentYear, currentMonth })
  }
}

export const getters = {
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
  }
}
