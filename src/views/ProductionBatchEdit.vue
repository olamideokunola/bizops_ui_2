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
        @click="saveBatch"
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
            {{batchQuantity}} pcs
          </v-chip>

          <v-chip
          class="ma-2"
          color="secondary"
          >
            &#8358;{{batchValue}}
          </v-chip>
        </v-col>
      </v-row>

      <!-- Content-->
      <ProductionBatchView
        :outerbatch="batch"
        :outerbatchnumber="batchnumber"
        :outerproducttype="producttype"
        ></ProductionBatchView>

      <!-- Snackbar -->
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

import ProductionBatchView from '../components/ProductionBatchView'

export default {
  name: 'Production',
  components: {
    ProductionBatchView
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

    const breadctumbsItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Production',
        disabled: false,
        href: '/#/production/summary'
      },
      {
        text: 'Batches',
        disabled: false,
        href: '/#/production/batches'
      },
      {
        text: 'Batch',
        disabled: true,
        href: '/'
      }
    ]
    const title = ref('Batch:  ' + $route.params.batchnumber)

    const batchnumber = ref($route.params.batchnumber)

    const producttype = ref($route.params.producttype)

    const batch = computed(() => $store.getters.batch(producttype.value, batchnumber.value))

    // alert('In ProductionBatchEdit, producttype is: ' + producttype.value)
    // alert('In ProductionBatchEdit, batchnumber is: ' + batchnumber.value)
    // alert('In ProductionBatchEdit, id is: ' + batch.value.id)

    const batchQuantity = computed(() => $store.getters.batchQuantity(producttype.value, batchnumber.value))

    const batchValue = computed(() => $store.getters.batchValue(producttype.value, batchnumber.value))

    const saveBatch = () => {
      $store.dispatch('updateProductionBatch', { producttype: producttype.value, batch: batch.value })
        .then(() => $router.push({ name: 'ProductionBatchEdit', params: { producttype: producttype.value, batchnumber: $store.state.production.savedProductionBatch.id } }))
    }

    return {
      breadctumbsItems,
      title,
      state,
      batchnumber,
      producttype,
      batch,
      batchQuantity,
      batchValue,
      saveBatch
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>

</style>
