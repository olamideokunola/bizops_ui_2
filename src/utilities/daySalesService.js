import { computed, reactive, toRefs } from '@vue/composition-api'

// main service functions
function useDaySalesService ({ state }) {
  // alert('In usedDaySalesService, daySales is: ' + state.store.state.daySales.length)
  const localstate = reactive({
    daySales: computed(() => state.store.state.daySales),
    daySaleQuantities: computed(() => {
      return localstate.daySales.map((daySale) => Number(daySale.quantity))
    }),
    daySaleQuantity: computed(() => {
      if (localstate.daySaleQuantities.length > 0) {
        return localstate.daySaleQuantities.reduce((total, quantity) => {
          return Number(total) + Number(quantity)
        })
      }
    }),
    daySalePrices: computed(() => localstate.daySales.map((daySale) => Number(daySale.price.price))),
    daySaleAmounts: computed(() => {
      return state.store.state.daySales.map((sale) => sale.quantity * sale.product.price.price)
    }),
    daySaleAmount: computed(() => {
      if (localstate.daySaleAmounts.length > 0) {
        return localstate.daySaleAmounts.reduce((total, daySaleAmount) => {
          return Number(total) + Number(daySaleAmount)
        })
      }
    }),
    // 1 Get all Products
    products: computed(() => state.store.state.products),
    // 2 Get all sales and group per product into a list of one object per product to SalesPerProductList
    salesPerProductList: computed(() => {
      return localstate.products.map((product) => {
        return localstate.daySales.filter((daySale) => daySale.product.name === product.name)
      })
    }),
    salesSummaryPerProduct: [],
    salesPerProduct: [],
    quantity: 0,
    averagePrice: 0,
    lastSaleTime: 0,
    result: false,
    prices: [],
    quantities: 0,
    saletimes: '',
    totalOfPrices: 0,
    amount: 0,
    productGroups: state.store.state.productGroups,
    salesPerProductGroup: [],
    productSales: [],
    daySalePerProductGroup: computed({
      get: () => {
        localstate.salesSummaryPerProduct = []
        // 3 For each Product,
        localstate.products.forEach((product) => {
        // - get all product attributes
          // - get the corresponding SalesPerProduct
          localstate.salesPerProduct = localstate.salesPerProductList.find((sales) => {
            localstate.result = false
            if (sales.length > 0) {
              if (sales[0].product.name === product.name) {
                localstate.result = true
              } else {
                localstate.result = false
              }
            } else {
              localstate.result = false
            }
            return localstate.result
          })

          // - if SalesPerProduct exists,
          if (localstate.salesPerProduct && localstate.salesPerProduct.length > 0) {
            // - calculate total qty
            localstate.quantities = localstate.salesPerProduct.map((sale) => sale.quantity)
            localstate.quantity = localstate.quantities.reduce((total, qty) => {
              return Number(total) + Number(qty)
            })
            console.log('quantity: ' + localstate.quantity)

            // - calculate average price
            localstate.prices = localstate.salesPerProduct.map((sale) => sale.price.price)
            console.log('number of prices: ' + localstate.prices.length)
            localstate.totalOfPrices = localstate.prices.reduce((total, price) => {
              return Number(total) + Number(price)
            })
            console.log('totalOfPrices: ' + localstate.totalOfPrices)

            localstate.averagePrice = localstate.totalOfPrices / localstate.salesPerProduct.length
            console.log('averagePrice: ' + localstate.averagePrice)

            // - get most resent saleTime
            localstate.saletimes = localstate.salesPerProduct.map((sale) => sale.lastSaleTime)
            localstate.saletimes.sort()
            localstate.lastSaleTime = localstate.saletimes[localstate.saletimes.length - 1]
            console.log('lastSaleTime: ' + localstate.lastSaleTime)

            //  - if SalesPerProduct does not exist
          } else {
          // - set qty to zero
            localstate.quantity = 0
          }
          // 5 Calculate amount
          localstate.amount = localstate.quantity * localstate.averagePrice
          console.log('amount: ' + localstate.amount)

          // 6 put product attributes, qty, price, amount (calculate) into objects and put them in SalesSummaryPerProduct
          localstate.salesSummaryPerProduct.push(reactive({
            productId: product.id,
            productUnits: product.units,
            productGroupName: product.group,
            productName: product.name,
            productPrice: product.price,
            quantity: localstate.quantity,
            lastSaleTime: localstate.lastSaleTime,
            amount: localstate.amount
          }))

          console.log('items in salesSummaryPerProduct: ' + localstate.salesSummaryPerProduct.length)
          console.log('first productId in salesSummaryPerProduct: ' + localstate.salesSummaryPerProduct[0].productId)

          console.log('first productName in salesSummaryPerProduct: ' + localstate.salesSummaryPerProduct[0].productName)
        })

        //      7 Get all product group
        console.log('Items in productGroups: ' + localstate.productGroups.length)
        localstate.productGroups.forEach((productGroup) => {
          console.log(productGroup.name)
        })

        // - for each product group, get all the SalesSummaryPerProduct and put them together as objects in SalesSummaryPerProductGroup
        localstate.salesPerProductGroup = []
        localstate.productGroups.forEach((productGroup) => {
          localstate.productSales = localstate.salesSummaryPerProduct.filter((salesSummary) => {
            return salesSummary.productGroupName === productGroup.name
          })
          if (localstate.productSales.length > 0) {
            localstate.salesPerProductGroup.push({
              groupTitle: productGroup.name,
              productSales: localstate.productSales
            })
          }
        })
        return localstate.salesPerProductGroup
      } // ,
      // set: (val) => { state.store.state.authenticationFailure = val }
    })
    // ,
    // calculateMonthSales: ({ year, month }) => {
    //   state.store.dispatch('getMonthSales')
    // }
  })

  return toRefs(localstate)

  // return {
  //   toRefs(localstate),
  //   daySaleQuantity,
  //   daySaleAmount,
  //   daySalePerProductGroup
  // }
}

export { useDaySalesService }
