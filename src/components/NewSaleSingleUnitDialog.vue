<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="400px">
      <v-card>
        <v-container>
        <v-card-text class = "pt-4 pb-0">
          New Sale
          <p></p>
        </v-card-text>
        <v-card-title>
          <span class="headline">{{product.name}}</span>
        </v-card-title>
        <v-card-subtitle class="pt-0 subtitle-1 pb-0 font-weight-light">
            &#8358;{{product.price}}
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
import { computed, reactive } from '@vue/composition-api'
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
    const blankSale = {
      id: 0,
      product: {},
      price: 0,
      currency: 'NGN',
      date: {
        year: year,
        month: month,
        day: day
      },
      quantity: 0,
      customer: {},
      // todo: use current time
      lastSaleTime: '8:14am',
      // todo: use current user
      creator: 'joy@favychos.com'
    }
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
      creator: 'joy@favychos.com'
    })

    const unit = {
      short: props.product.unit,
      long: props.product.unit
    }

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

    function saveSale () {
      if (sale.quantity > 0) {
        sale.product = props.product
        sale.price = props.product.price
        const newSale = {}
        Object.assign(newSale, sale)
        const action = 'add'
        const currentQuantity = Number(props.productSale.quantity)
        newSale.date.year = Number(newSale.date.year)
        newSale.date.month = Number(newSale.date.month)
        newSale.date.day = Number(newSale.date.day)
        newSale.quantity = Number(newSale.quantity)
        $store.dispatch('addItemToSale', { newSale, action, currentQuantity })
          .then(
            Object.assign(sale, blankSale),
            alert('In saveSale: ' + blankSale.quantity),
            dialog = false
          )
      } else {
        $store.commit('showSnackBar', { state: true, text: 'Quantity must be greater than 0!' })
      }
    }

    return {
      dialog,
      customers,
      sale,
      saveSale,
      unit
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
