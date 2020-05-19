<template>
  <div>

    <!-- Tool Bar -->
    <v-toolbar
      dense
      color="#ffffff"
      light
      >

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
        >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>

      <v-btn
        class="ml-2"
        x-small
        color="#53CFCB"
        fab
        dark
        to="/products/new"
        >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

    </v-toolbar>

    <v-container >
      <!-- Title -->
      <v-row class="pt-0 mt-0 mb-0">
          <v-col
            cols="6"
          >
            <h1>{{ title }}</h1>
          </v-col>
      </v-row>
      <!-- Content-->
      <edit-product
        title="Edit Product"
        :product="state.store.state.editProduct"
        >

      </edit-product>

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
import { ref, reactive } from '@vue/composition-api'

import EditProduct from '../components/ProductView'

export default {
  name: 'UserNew',
  components: {
    'edit-product': EditProduct
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
    $store.dispatch('loadUnits')
    $store.dispatch('loadProducts')

    const title = ref('Edit Product')

    const edittedProductName = $route.params.productname
    $store.state.editProduct = $store.state.products.find((product) => product.name === edittedProductName)

    const breadcrumbsItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Products',
        disabled: false,
        href: '#/products/productlist/'
      },
      {
        text: title.value,
        disabled: true,
        href: '/'
      }
    ]

    return {
      breadcrumbsItems,
      title,
      state
    }
  }
}
</script>
