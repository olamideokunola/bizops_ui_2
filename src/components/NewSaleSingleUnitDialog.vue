<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="400px">
      <v-card>
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          absolute
          bottom
          color="#53CFCB"
        ></v-progress-linear>
        <v-container>
        <v-card-text class = "pt-4 pb-0">
          New Sale
          <p></p>
        </v-card-text>
        <v-card-title>
          <span class="headline">{{product.name}}</span>
        </v-card-title>
        <v-card-subtitle class="pt-0 subtitle-1 pb-0 font-weight-light">
            &#8358;{{product.price ? product.price.price : ''}}
        </v-card-subtitle>
        <v-card-text class="subtitle-2 font-weight-light">
        </v-card-text>
        <v-card-text>
          <v-row class="pb-0">
            <v-col>
              <v-text-field
                v-model="sale.quantity"
                label="Quantity"
                type="number"
                :rules="quantityRules"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col>
                <div>{{product.unit}}</div>
            </v-col>
          </v-row>
          <v-row class="pt-0">
              <v-col class="pt-0">
                <v-autocomplete
                  v-model="sale.customer"
                  :items="customers"
                  outlined
                  dense
                  label="Customer"
              ></v-autocomplete>
              </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveSale"
            >
              Save
            </v-btn>
        </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { computed, reactive, ref } from '@vue/composition-api'
import { useDateUtilities } from '../utilities/dateUtils'

export default {
  props: {
    addSaleDialog: {
      type: Boolean,
      default: true
    },
    productSale: {
      type: Object,
      default: function () {
        return {}
      }
    },
    product: {
      type: Object,
      default: function () {
        return {
          id: null,
          group: '',
          name: '',
          title: '',
          date: {
            year: 0,
            month: 0,
            day: 0
          },
          price: '',
          prices: [],
          unit: { short: '', long: '' },
          units: [{ short: '', long: '' }]
        }
      }
    }
  },
  setup (props, { emit, root: { $store } }) {
    const state = reactive({
      store: $store
    })
    const { day, month, year } = useDateUtilities({ state })

    const sale = reactive({
      id: 0,
      product: {},
      price: 0,
      currency: 'NGN',
      date: {
        year: Number(year),
        month: Number(month) + 1,
        day: Number(day)
      },
      quantity: null,
      customer: {},
      // todo: use current time
      lastSaleTime: '8:14am',
      // todo: use current user
      creator: ''
    })

    const unit = {
      short: props.product.unit,
      long: props.product.unit
    }

    const loading = ref(false)

    var dialog = computed({
      get: () => props.addSaleDialog,
      set: (val) => {
        emit('update:addSaleDialog', val)
      }
    })

    var customers = computed({
      get: () => $store.state.sale.customers.map((customer) => customer.name),
      set: (val) => {
        emit('update:addSaleDialog', val)
      }
    })

    function resetSale () {
      sale.id = 0
      sale.product = {}
      sale.price = 0
      sale.currency = 'NGN'
      sale.date = {
        year: Number(year),
        month: Number(month) + 1,
        day: Number(day)
      }
      sale.quantity = null
      sale.customer = {}
      // todo= use current time
      sale.lastSaleTime = '8:14am'
      // todo= use current user
      sale.creator = ''
    }

    const { currentDay, currentMonth, currentYear } = useDateUtilities({ state })

    function saveSale () {
      if (sale.quantity > 0) {
        sale.product = props.product
        sale.price = props.product.price
        const newSale = {}
        Object.assign(newSale, sale)
        const action = 'add'
        const currentQuantity = Number(props.productSale.quantity)
        // newSale.date.year = Number(newSale.date.year)
        // newSale.date.month = Number(newSale.date.month)
        // newSale.date.day = Number(newSale.date.day)
        newSale.quantity = Number(newSale.quantity)
        const today = new Date()
        newSale.lastSaleTime = today.getTime()
        newSale.date = {
          year: Number(currentYear.value),
          month: Number(currentMonth.value),
          day: Number(currentDay.value)
        }
        newSale.creator = $store.getters.loggedInUser
        loading.value = true
        $store.dispatch('addItemToSale', { newSale, action, currentQuantity })
          .then(() => {
            resetSale()
            // alert('In saveSale: ' + blankSale.quantity)
            loading.value = false
            dialog.value = false
          })
      } else {
        $store.commit('showSnackBar', { state: true, text: 'Quantity must be greater than 0!' })
      }
    }

    return {
      dialog,
      customers,
      sale,
      saveSale,
      unit,
      loading
    }
  },
  data: function () {
    return {
      quantityRules: [
        value => !!value || 'Quantity is required!',
        value => value > 0 || 'Quantity must be more than 0!'
      ]
    }
  }
}
</script>

<style scoped>

</style>
