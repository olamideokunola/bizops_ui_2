<template>
  <div>
    <!-- Tool Bar -->
    <v-toolbar
      dense
      color="#fafafa"
      light
      rounded
      >
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="#53CFCB"
      ></v-progress-linear>

      <v-breadcrumbs :items="breadctumbsItems" class="pl-0 hidden-sm-and-down">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <DateNavigator v-on:showSelectDateDialog="showSelectDaySalesDateDialog=true"></DateNavigator>
    </v-toolbar>

    <v-container >
      <!-- Title -->
      <v-row class="pt-0 mt-0 mb-0">
          <v-col
            cols="12"
            md="6"
          >
            <h1>{{ title }}</h1>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="d-flex justify-end"
          >
            <v-chip
            class="ma-2"
            color="secondary"
            >
              {{daySaleQuantity}} pcs
            </v-chip>

            <v-chip
            class="ma-2"
            color="secondary"
            >
              &#8358;{{daySaleAmount}}
            </v-chip>
          </v-col>
      </v-row>
      <!-- Content-->
      <product-group-sale
        class="pt-4"
        v-for="productGroupDaySales in daySalePerProductGroup"
        v-bind:key="productGroupDaySales.groupTitle"
        v-bind:productGroupDaySales='productGroupDaySales'
        v-on:openAddSaleDialog='openAddSaleDialog'
        v-on:openAddMultipleUnitSaleDialog='openAddMultipleUnitSaleDialog'
        v-on:addOneItemToSale='addOneItemToSale'
        v-on:removeOneItemFromSale='removeOneItemFromSale'
        >
      </product-group-sale>

      <new-sale-single-unit-dialog
        v-bind:addSaleDialog="addSaleDialog"
        v-on:update:addSaleDialog="addSaleDialog = $event"
        v-bind:productSale="productInfo.productSale"
        v-bind:product="productInfo.product"
        >
      </new-sale-single-unit-dialog>

      <new-sale-multiple-unit-dialog
        v-bind:addSaleDialog="addMultipleUnitSaleDialog"
        v-on:update:addSaleDialog="addMultipleUnitSaleDialog = $event"
        v-bind:productSale="productInfo.productSale"
        v-bind:product="productInfo.product"
        >
      </new-sale-multiple-unit-dialog>

      <v-snackbar
        v-model="state.store.state.snackBar.state"
        >
        {{ state.store.state.snackBar.text }}
        <v-btn
          color="pink"
          text
          @click="state.store.state.snackBar.state = false"
        >
          Close
        </v-btn>
      </v-snackbar>

      <daysales-selectdate-dialog
        v-bind:showDialog=showSelectDaySalesDateDialog
        v-on:update:showDialog="showSelectDaySalesDateDialog = $event"
      >
      </daysales-selectdate-dialog>
    </v-container>
  </div>
</template>

<script>
import { ref, reactive, watch } from '@vue/composition-api'
import { useDateUtilities, getYearInYYYYMMYY, getMonthInYYYYMMYY, getDayInYYYYMMYY } from '../utilities/dateUtils'
import { useDaySalesService } from '../utilities/daySalesService'

import ProductGroupSale from '../components/ProductGroupSale'
import NewSaleSingleUnitDialog from '../components/NewSaleSingleUnitDialog'
import NewSaleMultipleUnitDialog from '../components/NewSaleMultipleUnitDialog'
import DaySalesSelectDateDialog from '../components/DaySalesSelectDateDialog'
import DateNavigator from '../components/DateNavigator'

export default {
  name: 'DaySales',
  components: {
    'product-group-sale': ProductGroupSale,
    'new-sale-single-unit-dialog': NewSaleSingleUnitDialog,
    'new-sale-multiple-unit-dialog': NewSaleMultipleUnitDialog,
    'daysales-selectdate-dialog': DaySalesSelectDateDialog,
    DateNavigator
  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      snackBarState: $store.state.snackBar.state,
      snackBarText: $store.state.snackBar.text,
      contextualNavMenuItems: [
        { title: 'Summary', icon: 'mdi-format-list-bulleted-square' },
        { title: 'Export', icon: 'mdi-file-export' }
      ]
    })

    $store.commit('setContextualNavMenuItems', state.contextualNavMenuItems)

    const breadctumbsItems = [
      {
        text: 'Home',
        disabled: true,
        href: '/'
      },
      {
        text: 'Day Sales',
        disabled: true,
        href: '/'
      }
    ]

    // Load Day Sales

    const title = ref('Day Sales')
    const { currentDate, nextDay, previousDay, currentDateYYYYMMDD } = useDateUtilities({ state })

    // $store.commit('SET_CURRENT_DATE', currentDate)

    // $store.dispatch('loadProducts')
    // $store.dispatch('loadDaySales', { year, month: monthCorrected, day })

    const {
      daySales,
      daySalePrices,
      daySaleQuantity,
      daySaleAmount,
      daySalePerProductGroup,
      daySaleAmounts,
      daySaleQuantities
    } = useDaySalesService({ state })

    // Watch for changes in current date and reload daysales
    watch(
      currentDateYYYYMMDD,
      (currentDateYYYYMMDD) => {
        // alert('In currentDate watch! ' + currentDateYYYYMMDD)
        const year = getYearInYYYYMMYY(currentDateYYYYMMDD)
        const month = getMonthInYYYYMMYY(currentDateYYYYMMDD)
        const day = getDayInYYYYMMYY(currentDateYYYYMMDD)
        $store.dispatch('loadDaySales', { year, month, day })
      }
    )

    var addSaleDialog = ref(false)
    var addMultipleUnitSaleDialog = ref(false)
    var showSelectDaySalesDateDialog = ref(false)

    const productInfo = reactive({
      productSale: {},
      product: {}
    })

    const openAddSaleDialog = function (productSale) {
      // alert('In openAddSaleDialog')
      addSaleDialog.value = true
      productInfo.productSale = productSale
      productInfo.product = $store.state.product.products.find((product) => product.id === productSale.productId)
      // alert(event.productName)
    }

    const openAddMultipleUnitSaleDialog = function (productSale) {
      // alert('In openAddSaleDialog')
      addMultipleUnitSaleDialog.value = true
      productInfo.productSale = productSale
      productInfo.product = $store.state.product.products.find((product) => product.id === productSale.productId)

      // alert(event.productName)
    }

    const loading = ref(false)

    const addOneItemToSale = function (newSale) {
      // alert('In DaySales addOneItemToSale , qty is: ' + newSale.quantity)
      const action = 'add'
      const currentQuantity = 0
      loading.value = true
      $store.dispatch('addItemToSale', { newSale, action, currentQuantity })
        .then(() => {
          loading.value = false
        })
    }

    const removeOneItemFromSale = function (payload) {
      const newSale = payload.newSale
      const action = 'remove'
      const currentQuantity = payload.currentQuantity
      loading.value = true
      $store.dispatch('addItemToSale', { newSale, action, currentQuantity })
        .then(() => {
          loading.value = false
        })
    }

    return {
      breadctumbsItems,
      title,
      daySales,
      currentDate,
      daySalePrices,
      daySaleQuantity,
      daySaleAmount,
      daySalePerProductGroup,
      state,
      addSaleDialog,
      openAddSaleDialog,
      productInfo,
      addMultipleUnitSaleDialog,
      openAddMultipleUnitSaleDialog,
      addOneItemToSale,
      removeOneItemFromSale,
      showSelectDaySalesDateDialog,
      nextDay,
      previousDay,
      daySaleAmounts,
      daySaleQuantities,
      loading
    }
  }
}
</script>
