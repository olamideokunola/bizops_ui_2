// import ProductionService from '../../services/ProductionService'

export const state = {
  dayProduction: {
    date: '',
    productTypes:
    [
      {
        id: 0,
        name: 'Bread',
        batches: [
          {
            id: 0,
            flourQuantity: 3,
            startTime: '8:00 AM',
            endTime: '9:00 AM',
            products: [
              {
                id: 1,
                name: '800g Loaf Bread',
                price: 400,
                goodQuantity: 16,
                damagedQuantity: 0
              },
              {
                id: 1,
                name: '600g Loaf Bread',
                price: 300,
                goodQuantity: 20,
                damagedQuantity: 0
              }
            ],
            baker: 'Ramon',
            supervisor: 'Bose',
            assistants: ['Chidinma', 'Busayo'],
            problems: ['Insufficient butter', 'Intermittent stoppage of mixer']
          },
          {
            id: 1,
            flourQuantity: 3,
            startTime: '8:00am',
            endTime: '9:00am',
            products: [
              {
                id: 1,
                name: '600g Loaf Bread',
                price: 300,
                goodQuantity: 16,
                damagedQuantity: 0
              }
            ],
            baker: 'Ramon',
            supervisor: 'Bose',
            assistants: ['Chidinma', 'Busayo'],
            problems: ['Insufficient butter']
          },
          {
            id: 2,
            flourQuantity: 3,
            startTime: '8:00am',
            endTime: '9:00am',
            products: [
              {
                id: 1,
                name: '600g Loaf Bread',
                price: 300,
                goodQuantity: 16,
                damagedQuantity: 0
              }
            ],
            baker: 'Ramon',
            supervisor: 'Bose',
            assistants: ['Chidinma', 'Busayo'],
            problems: ['Insufficient butter']
          }
        ]
      },
      {
        id: 0,
        name: 'Pastries',
        batches: [
          {
            id: 10001,
            flourQuantity: 3,
            startTime: '8:00am',
            endTime: '9:00am',
            products: [
              {
                id: 1,
                name: '70g x 50pc Donuts',
                price: 50,
                goodQuantity: 1000,
                damagedQuantity: 0
              }
            ],
            baker: 'Ramon',
            supervisor: 'Bose',
            assistants: ['Chidinma', 'Busayo'],
            problems: ['Insufficient butter']
          },
          {
            id: 10002,
            flourQuantity: 3,
            startTime: '8:00am',
            endTime: '9:00am',
            products: [
              {
                id: 1,
                name: '70g x 50pc Donuts',
                price: 50,
                goodQuantity: 1002,
                damagedQuantity: 0
              }
            ],
            baker: 'Ramon',
            supervisor: 'Bose',
            assistants: ['Chidinma', 'Busayo'],
            problems: ['Insufficient butter']
          }
        ]
      }
    ]
  }
}

export const mutations = {

}

export const actions = {

}

export const getters = {
  // returns a list of product summaries per product type
  dayProductionSummary (state) {
    return state.dayProduction.productTypes.map((productType) => {
      const noOfBatches = productType.batches.length

      const flourQuantities = productType.batches.map((batch) => batch.flourQuantity)
      const flourQuantity = flourQuantities.reduce((total, quantity) => total + quantity)

      const productQuantitiesPerBatch = productType.batches.map((batch) => {
        const productQuantities = batch.products.map((product) => product.goodQuantity)
        return productQuantities.reduce((total, quantity) => total + quantity)
      })
      const totalProductionQuantity = productQuantitiesPerBatch.reduce((total, quantity) => total + quantity)

      const productsAndAmountsPerBatch = productType.batches.map((batch) => {
        const productAmounts = batch.products.map((product) => product.goodQuantity * product.price)
        return productAmounts.reduce((total, amount) => total + amount)
      })

      const totalProductionValue = productsAndAmountsPerBatch.reduce((total, amount) => total + amount)

      var productTypeNames = []
      const batchProductNames = []
      productType.batches.forEach((batch) => {
        batch.products.forEach((product) => batchProductNames.push(product.name))
        productTypeNames = productTypeNames.concat([...new Set(batchProductNames)])
      })

      return {
        productTypeName: productType.name,
        productsPerProductTypeProducedOnDay: [...new Set(productTypeNames)],
        noOfBatches: { title: 'Number of Batches', item: noOfBatches + ' batch(es)', icon: 'mdi-layers-triple' },
        flourQuantity: { title: 'Flour quantity used', item: flourQuantity + ' kg of flour', icon: 'mdi-weight' },
        totalProductionQuantity: { title: 'Total quantity', item: totalProductionQuantity + ' ', icon: 'mdi-counter' },
        totalProductionValue: { title: 'Total value', item: totalProductionValue + ' naira', icon: 'mdi-cash' }
      }
    })
  },
  totalDayProductionQuantity (state) {
    const productionQuantitiesPerProductType = state.dayProduction.productTypes.map((productType) => {
      const productQuantitiesPerBatch = productType.batches.map((batch) => {
        const productQuantities = batch.products.map((product) => product.goodQuantity)
        return productQuantities.reduce((total, quantity) => total + quantity)
      })
      return productQuantitiesPerBatch.reduce((total, quantity) => total + quantity)
    })

    return productionQuantitiesPerProductType.reduce((total, quantity) => total + quantity)
  },
  totalDayProductionValue (state) {
    const productionValuePerProductType = state.dayProduction.productTypes.map((productType) => {
      const productsAndAmountsPerBatch = productType.batches.map((batch) => {
        const productAmounts = batch.products.map((product) => product.goodQuantity * product.price)
        return productAmounts.reduce((total, amount) => total + amount)
      })
      return productsAndAmountsPerBatch.reduce((total, amount) => total + amount)
    })

    return productionValuePerProductType.reduce((total, amount) => total + amount)
  },
  productsPerProductTypeProducedOnDay (state) {
    return state.dayProduction.productTypes.map((productType) => {
      var productTypeNames = []
      const batchProductNames = []
      productType.batches.forEach((batch) => {
        batch.products.forEach((product) => batchProductNames.push(product.name))
        productTypeNames = productTypeNames.concat([...new Set(batchProductNames)])
      })
      return [...new Set(productTypeNames)]
    })
  },
  dayProductionWithTotalQuantityAndProductNames (state) {
    return state.dayProduction.productTypes.map((productType) => {
      return {
        id: productType.id,
        name: productType.name,
        batches: productType.batches.map((batch) => {
          const quantities = batch.products.map((product) => product.goodQuantity)
          return {
            id: batch.id,
            flourQuantity: batch.flourQuantity,
            startTime: batch.startTime,
            endTime: batch.endTime,
            quantity: quantities.reduce((total, quantity) => total + quantity),
            productNames: batch.products.map((product) => product.name).join(', '),
            baker: batch.baker,
            supervisor: batch.supervisor
          }
        })
      }
    })
  },
  batch: (state) => (productTypeName, batchnumber) => {
    const productType = state.dayProduction.productTypes.find((productType) => productType.name === productTypeName)
    const batch = productType.batches.find((batch) => batch.id === batchnumber)
    return batch
  },
  batchQuantity: (state, getters) => (productTypeName, batchnumber) => {
    const batch = getters.batch(productTypeName, batchnumber)
    const quantities = batch.products.map((product) => product.goodQuantity)
    return quantities.reduce((total, quantity) => Number(total) + Number(quantity))
  },
  batchValue: (state, getters) => (productTypeName, batchnumber) => {
    const batch = getters.batch(productTypeName, batchnumber)
    const values = batch.products.map((product) => product.goodQuantity * product.price)
    return values.reduce((total, value) => total + value)
  }
}
