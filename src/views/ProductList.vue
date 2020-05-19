<template>
  <div>

    <!-- Tool Bar -->
    <v-toolbar
      dense
      color="#ffffff"
      light
      >

      <v-breadcrumbs :items="breadctumbsItems" class="pl-0">
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
      <products-per-productgroup
        v-bind:productGroupProductsList=productGroupProductsList
        >
      </products-per-productgroup>

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

import ProductsPerProductGroup from '../components/ProductsPerProductGroup'

export default {
  name: 'ProductList',
  components: {
    'products-per-productgroup': ProductsPerProductGroup
  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      snackBarState: $store.state.snackBar.state,
      snackBarText: $store.state.snackBar.text,
      contextualNavMenuItems: [
        { title: 'New Product', icon: 'mdi-format-list-bulleted-square' },
        { title: 'Product List', icon: 'mdi-file-export' }
      ]
    })

    // $store.commit('setContextualNavMenuItems', state.contextualNavMenuItems)
    // $store.dispatch('loadProducts')

    const breadctumbsItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Products',
        disabled: true,
        href: '/'
      }
    ]
    const title = ref('Products')

    // Set imagenames
    // const products = $store.state.products
    // const re = / /gi
    // const productsWithImages = $store.state.products.map((product) => {
    //   // product.imgsrc = require('../assets/images/' + product.name.replace(re, '_') + '.png')
    //   product.imgsrc = 'http://127.0.0.1:8000/bizops/productimage/' + product.name.replace(re, '_') + '.png'
    //   return product
    // })

    const productGroupProductsList = computed(() => {
      const productGroups = $store.state.productGroups
      const products = $store.state.products

      // Set images

      // 0 Create an empty list for all the products grouped by their groups [{groupTitle: 'title', products: [{product1},{product2}]}]
      const productByProductGroupList = []
      // 1 Get each productGroup
      productGroups.forEach((productGroup) => {
        // 2 Create a an empty object with productGroup.name as groupTitle and products object as blank
        const productGroupsItems = {
          groupTitle: productGroup.name,
          // 3 Get all the products and put them in a list, set the list as to the products object
          products: products.filter((product) => product.group === productGroup.name)
        }
        // 4 Put the list in the empty
        productByProductGroupList.push(productGroupsItems)
      })
      return productByProductGroupList.filter((groupItems) => groupItems.products.length > 0)
    })

    return {
      breadctumbsItems,
      title,
      state,
      productGroupProductsList
    }
  }
}
</script>
