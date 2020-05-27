<template>
  <div>
      <v-subheader>{{ state.productGroupDaySalesVals.groupTitle }}</v-subheader>
      <v-row class="mb-6">
        <v-col
            cols="12"
            sm="4"
            v-for="productSale in state.productGroupDaySalesVals.productSales"
            v-bind:key="productSale.productName"
            >
            <v-card
              width="100%"
              >
              <v-card-title class="headline mb-0">{{ productSale.productName }}</v-card-title>
              <v-card-subtitle>Price: {{ productSale.productPrice.price }} <br>Last sale: {{ productSale.lastSaleTime }}</v-card-subtitle>
              <v-chip
                  class="ml-4 mt-0"
                  light
                  color="#EDE8E4"
                >
                  {{ productSale.quantity }}
              </v-chip>

              <v-chip
                  class="ma-2"
                  light
                  color="#EDE8E4"
                >
                  &#8358;{{ productSale.amount }}
              </v-chip>

              <v-divider class="mx-4 mt-2"></v-divider>

              <v-card-actions class="pl-4 pr-4">
                  <v-btn
                    color="#53CFCB"
                    small
                    fab
                    outlined
                    @click="removeOneItemFromSale(productSale)"
                    >
                    <v-icon
                      dark
                      >
                      mdi-minus
                    </v-icon>
                  </v-btn>
                  <v-btn
                    color="#53CFCB"
                    small
                    fab
                    outlined
                    @click="addOneItemToSale(productSale)"
                    >
                    <v-icon
                      dark
                      >
                      mdi-plus
                    </v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                    color="#53CFCB"
                    fab
                    small
                    @click="openAddSaleDialog(productSale)"
                    >
                    <v-icon
                      dark
                      >
                      mdi-playlist-plus
                    </v-icon>

                  </v-btn>
              </v-card-actions>

            </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { reactive, watchEffect } from '@vue/composition-api'
import { useDateUtilities } from '../utilities/dateUtils'

export default {
  components: {

  },
  props: {
    productGroupDaySales: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  setup (props, { emit, root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      newSale: {},
      productGroupDaySalesVals: []
    })
    watchEffect(() => {
      state.productGroupDaySalesVals = props.productGroupDaySales
    })
    // const productGroupDaySalesVals = props.productGroupDaySales
    const { currentDay, currentMonth, currentYear } = useDateUtilities({ state })

    function openAddSaleDialog (productSale) {
      if (productSale.productUnits.length === 1) {
        emit('openAddSaleDialog', productSale)
      } else {
        // alert('In add MultipleUNit!')
        emit('openAddSaleDialog', productSale)
        // emit('openAddMultipleUnitSaleDialog', productSale)
      }
    }

    function addOneItemToSale (productSale) {
      const product = $store.state.product.products.find((product) => productSale.productName === product.name)
      // alert('In ProductGroupsSale, current day: ' + currentDay.value)
      state.newSale = {
        id: 0,
        product: product,
        quantity: 1,
        price: product.price,
        currency: 'NGN',
        date: {
          year: Number(currentYear.value),
          month: Number(currentMonth.value),
          day: Number(currentDay.value)
        },
        customer: {},
        // todo: use current time
        lastSaleTime: '8:14am',
        // todo: use current user
        creator: 'joy@favychos.com'
      }
      // alert('In ProductgroupSale addONeItemToSale ' + state.newSale.quantity)
      // console.log('In addOneItemToSale method')
      emit('addOneItemToSale', state.newSale)
    }

    function removeOneItemFromSale (productSale) {
      const product = $store.state.product.products.find((product) => productSale.productName === product.name)
      state.newSale = {
        id: 0,
        product: product,
        quantity: -1,
        price: product.price,
        currency: 'NGN',
        date: {
          year: Number(currentYear.value),
          month: Number(currentMonth.value),
          day: Number(currentDay.value)
        },
        customer: {},
        // todo: use current time
        lastSaleTime: '8:14am',
        // todo: use current user
        creator: 'joy@favychos.com'
      }

      const payload = {
        newSale: state.newSale,
        currentQuantity: Number(productSale.quantity)
      }
      // console.log('In addOneItemToSale method')
      emit('removeOneItemFromSale', payload)
    }

    return {
      state,
      openAddSaleDialog,
      addOneItemToSale,
      removeOneItemFromSale
    }
  }

}
</script>

<style scoped>

</style>
