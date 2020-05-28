import ProductionService from '../../services/ProductionService'

export const state = {
  productTypes: ['Bread', 'Pastries'],
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
  },
  savedProductionBatch: {}
}

export const mutations = {
  SET_DAY_PRODUCTION_BATCHES (state, dayProductionBatches) {
    // alert('About to set batches!')
    const productTypes = state.productTypes// [...new Set(dayProductionBatches.map((batch) => batch.productType))]

    const groupedProductTypes = []

    productTypes.forEach((productType) => {
      const productsPerProductType = dayProductionBatches.filter((batch) => batch.productType === productType)
      groupedProductTypes.push({
        name: productType,
        batches: productsPerProductType
      })
    })

    state.dayProduction = {
      date: dayProductionBatches.length > 0 ? dayProductionBatches[0].date : '',
      productTypes: groupedProductTypes
    }
  },
  SET_SAVED_PRODUCTION_BATCH (state, productionbatch) {
    // alert('About to set batch!')
    state.savedProductionBatch = productionbatch
    // alert('In SET_SAVED_PRODUCTION_BATCH, New Batch Id is: ' + state.savedProductionBatch.id)
  }
}

export const actions = {
  loadDayProductionBatches ({ commit }, { year, month, day }) {
    return ProductionService.loadDayProductionBatches({ commit }, { year, month, day })
  },
  saveProductionBatch ({ commit }, { producttype, batch }) {
    return ProductionService.saveProductionBatch({ commit }, { producttype, batch })
  },
  updateProductionBatch ({ commit }, { producttype, batch }) {
    return ProductionService.updateProductionBatch({ commit }, { producttype, batch })
  }
}

export const getters = {
  // returns a list of product summaries per product type
  dayProductionSummary (state) {
    return state.dayProduction.productTypes.map((productType) => {
      const noOfBatches = productType.batches.length

      const flourQuantities = productType.batches.map((batch) => Number(batch.flourQuantity))
      const flourQuantity = flourQuantities.length > 0 ? flourQuantities.reduce((total, quantity) => total + quantity) : 0

      const productQuantitiesPerBatch = productType.batches.map((batch) => {
        const productQuantities = batch.products.map((product) => Number(product.goodQuantity))
        return productQuantities.length > 0 ? productQuantities.reduce((total, quantity) => total + quantity) : 0
      })
      const totalProductionQuantity = productQuantitiesPerBatch.length > 0 ? productQuantitiesPerBatch.reduce((total, quantity) => total + quantity) : 0

      const productsAndAmountsPerBatch = productType.batches.map((batch) => {
        const productAmounts = batch.products.map((product) => Number(product.goodQuantity) * Number(product.price))
        return productAmounts.length > 0 ? productAmounts.reduce((total, amount) => total + amount) : 0
      })

      const totalProductionValue = productsAndAmountsPerBatch.length > 0 ? productsAndAmountsPerBatch.reduce((total, amount) => total + amount) : 0

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
        const productQuantities = batch.products.map((product) => Number(product.goodQuantity))
        return productQuantities.length > 0 ? productQuantities.reduce((total, quantity) => total + quantity) : 0
      })
      return productQuantitiesPerBatch.length > 0 ? productQuantitiesPerBatch.reduce((total, quantity) => total + quantity) : 0
    })

    return productionQuantitiesPerProductType.length > 0 ? productionQuantitiesPerProductType.reduce((total, quantity) => total + quantity) : 0
  },
  totalDayProductionValue (state) {
    const productionValuePerProductType = state.dayProduction.productTypes.map((productType) => {
      const productsAndAmountsPerBatch = productType.batches.map((batch) => {
        const productAmounts = batch.products.map((product) => Number(product.goodQuantity) * Number(product.price))
        return productAmounts.length > 0 ? productAmounts.reduce((total, amount) => total + amount) : 0
      })
      return productsAndAmountsPerBatch.length > 0 ? productsAndAmountsPerBatch.reduce((total, amount) => total + amount) : 0
    })

    return productionValuePerProductType.length > 0 ? productionValuePerProductType.reduce((total, amount) => total + amount) : 0
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
          const quantities = batch.products.map((product) => Number(product.goodQuantity))
          return {
            id: batch.id,
            flourQuantity: batch.flourQuantity,
            startTime: batch.startTime,
            endTime: batch.endTime,
            quantity: quantities.length > 0 ? quantities.reduce((total, quantity) => total + quantity) : 0,
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
    return quantities.length > 0 ? quantities.reduce((total, quantity) => Number(total) + Number(quantity)) : 0
  },
  batchValue: (state, getters) => (productTypeName, batchnumber) => {
    const batch = getters.batch(productTypeName, batchnumber)
    const values = batch.products.map((product) => Number(product.goodQuantity) * Number(product.price))
    return values.length > 0 ? values.reduce((total, value) => total + value) : 0
  }
}
