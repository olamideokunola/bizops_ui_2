<template>
  <div>

    <!-- Tool Bar -->
    <v-toolbar
      dense
      color="#ffffff"
      light
      >

      <v-btn
        class="pl-4 pr-4"
        icon
        x-small
        color="#0B78BF"
        >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-breadcrumbs :items="breadcrumbsItems" class="pl-0">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <v-toolbar-title class="pr-6"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        x-small
        color="#53CFCB"
        fab
        dark
        @click="savePrices"
        >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>

      <!--v-btn
        x-small
        color="#53CFCB"
        fab
        >
        <v-icon>mdi-plus</v-icon>
      </v-btn-->

    </v-toolbar>

    <v-container >
      <!-- Title -->
      <v-row class="pt-0 mt-0 mb-0">
          <v-col
            cols="6"
          >
            <h1>{{ title }} </h1>
            {{productname}}
          </v-col>
      </v-row>

      <!-- Content-->
        <!-- New Price -->
      <v-card>
        <v-card-title>Add New Price</v-card-title>
        <v-card-text>
          <v-form>
            <v-row class="mb-0 pb-0">
              <v-col>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Price Date"
                      outlined
                      readonly
                      dense
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="price"
                  outlined
                  dense
                  label="Price"
                  type="number"
                  >Price
                </v-text-field>
              </v-col>
            </v-row>
            <v-btn
              class="mt-0 pt-0"
              color="#53CFCB"
              dark
              @click="addPrice"
              >Add Price
              </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <!-- Prices -->
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="prices"
        :single-select="singleSelect"
        item-key="price"
        show-select
        class="elevation-1 mt-4"
        >
        <template v-slot:top>
          <v-toolbar
            flat
            >
            <v-row>
              <v-col>
                <v-toolbar-title class="pt-8 pl-1">Prices</v-toolbar-title>
              </v-col>

              <v-spacer></v-spacer>

              <v-col cols="3">
                <v-select
                  outlined
                  class="pt-8"
                  dense
                  v-model="defaultPrice"
                  :items="priceLabels"
                  attach
                  chips
                  small-chips
                  label="Default Price"
                ></v-select>
              </v-col>
            </v-row>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editPrice(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deletePrice(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

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
    </v-container >
  </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'

export default {
  name: 'ProductPrices',
  components: {
  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      snackBarState: $store.state.snackBar.state,
      snackBarText: $store.state.snackBar.text,
      contextualNavMenuItems: [
      ]
    })

    $store.commit('setContextualNavMenuItems', state.contextualNavMenuItems)

    const productname = $route.params.productname

    const date = ref(new Date().toISOString().substr(0, 10))
    const menu = ref(false)

    const breadcrumbsItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Products',
        disabled: false,
        href: '#/products/productlist'
      },
      {
        text: productname,
        disabled: true,
        href: '/products/'
      },
      {
        text: 'Prices',
        disabled: true,
        href: '/'
      }
    ]
    const title = ref('Prices')
    const price = ref(0)

    const product = $store.state.products.find((product) => $route.params.productname === product.name)

    const singleSelect = ref(false)
    const selected = ref(product.activePrices)
    // const selected = computed({
    //   get: () => {
    //     const prices = $store.state.products.find((product) => $route.params.productname === product.name).prices
    //     return prices.filter((price) => price.active === true)
    //   },
    //   set: (val) => val
    // })
    const headers = [
      {
        text: 'Price Date',
        align: 'start',
        sortable: false,
        value: 'date'
      },
      {
        text: 'Price',
        value: 'price'
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'right',
        sortable: false
      }
    ]

    const prices = computed(() => {
      return $store.state.products.find((product) => $route.params.productname === product.name).prices
    })

    const priceLabels = computed(() => {
      // const prices = $store.state.products.find((product) => $route.params.productname === product.name).prices
      return selected.value.map((price) => price.price)
    })

    const addPrice = () => {
      product.prices.push({
        date: date.value,
        price: price.value,
        active: false
      })
    }

    const editPrice = () => {

    }

    const deletePrice = () => {

    }

    var pricesWithActive = ref([])

    const defaultPrice = ref(0)

    const savePrices = () => {
      // set active prices
      pricesWithActive = product.prices.map((price) => {
        var active = selected.value.find((p) => p.price === price.price)
        if (active) {
          alert('Price is active ')

          price.active = true
        } else {
          price.active = false
        }
        return price
      })

      // save prices
      $store.dispatch('savePrices', {
        id: product.id,
        prices: pricesWithActive,
        defaultPrice: pricesWithActive.find((price) => price.price === String(defaultPrice.value))
      }).then(
        alert('Prices Added')
      )
    }

    return {
      breadcrumbsItems,
      title,
      state,
      singleSelect,
      selected,
      headers,
      prices,
      priceLabels,
      productname,
      date,
      menu,
      price,
      addPrice,
      editPrice,
      deletePrice,
      savePrices,
      pricesWithActive,
      defaultPrice
    }
  }
}
</script>
