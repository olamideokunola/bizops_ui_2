<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="400px">
      <v-card>
        <v-container>
        <v-card-text class = "pt-4 pb-0">
          New Sale Multiple Units
        </v-card-text>
        <v-card-title>
          <span class="headline">{{product.name}}</span>
        </v-card-title>
        <v-card-subtitle class="pt-0 subtitle-1 pb-0 font-weight-light">
            &#8358;{{product.price}}
        </v-card-subtitle>
        <v-card-text class="subtitle-2 font-weight-light">
            Last sale: {{product.lastSaleTime}}
        </v-card-text>
        <v-card-text>
          <v-form>
            <v-row class="pb-0">
                <v-col cols="12" class="pb-0">
                    <v-text-field
                        v-model="sale.quantity"
                        label="Quantity"
                        type="number"
                        :rules="quantityRules"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0">
                    <!--div class="pb-0">Units</div-->
                    <v-radio-group
                      class="pt-0"
                      v-model="sale.unit"
                      >
                      <v-radio
                        :label="unit.long"
                        v-for="unit in product.units"
                        v-bind:key="unit.short"
                      ></v-radio>
                    </v-radio-group>
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
          </v-form>
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
        return {}
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
    })

    var dialog = computed({
      get: () => props.addSaleDialog,
      set: (val) => {
        emit('update:addSaleDialog', val)
      }
    })

    var customers = computed({
      get: () => $store.state.customers.map((customer) => customer.name),
      set: (val) => {
        emit('update:addSaleDialog', val)
      }
    })

    function saveSale () {
      sale.product = props.product
      sale.price = props.product.price
      const newSale = {}
      Object.assign(newSale, sale)
      const action = 'add'
      const currentQuantity = props.productSale.quantity
      $store.dispatch('addItemToSale', { newSale, action, currentQuantity })
      Object.assign(sale, blankSale)
      dialog = false
      // alert('In saveSale: ' + dialog)
    }

    return {
      dialog,
      customers,
      sale,
      saveSale
    }
  },
  data: function () {
    return {
      quantityRules: [
        value => !!value || 'Quantity is required!'
      ]
    }
  }
}
</script>

<style scoped>

</style>
