<template>
  <div>

    <!-- Tool Bar -->
    <v-toolbar
      dense
      color="#ffffff"
      light
      >

      <v-breadcrumbs :items="breadctumbsItems" class="pl-0 hidden-sm-and-down">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <DateNavigator v-on:showSelectDateDialog="showSelectDateDialog"></DateNavigator>
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
            {{totalDayProductionQuantity}} pcs
          </v-chip>

          <v-chip
          class="ma-2"
          color="secondary"
          >
            &#8358;{{totalDayProductionValue}}
          </v-chip>
        </v-col>
      </v-row>
{{dayProductionWithTotalQuantityAndProductNames}}
      <!-- Content-->
      <div
        fluid
        v-for="(productType, id) in dayProductionWithTotalQuantityAndProductNames"
        :key="id"
        >
        <v-data-table
          :headers="headers"
          :items="productType.batches"
          sort-by="calories"
          class="elevation-1 mb-8"
          >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{productType.name}}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-btn
                class="ml-2"
                x-small
                color="#53CFCB"
                fab
                dark
                :to="{ name:'productionBatchNew', params: {  producttype: productType.name }}"
                >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              :to="{ name: 'ProductionBatchEdit', params: { producttype: productType.name, batchnumber: item.id } }"
              >
              <v-icon
                small
                class="mr-2"
                >
                mdi-pencil
              </v-icon>
            </v-btn>
            <!--v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon-->
          </template>
          <template v-slot:no-data>
            <div>No production</div>
          </template>
        </v-data-table>
      </div>
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
import { useDateUtilities, getYearInYYYYMMYY, getMonthInYYYYMMYY, getDayInYYYYMMYY } from '../utilities/dateUtils'
import { ref, reactive, watch } from '@vue/composition-api'
import { mapGetters, mapState } from 'vuex'
import DateNavigator from '../components/DateNavigator'

export default {
  name: 'Production',
  components: {
    DateNavigator
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
        disabled: true,
        href: '/'
      }
    ]
    const title = ref('Production Batches')
    const { currentDateYYYYMMDD } = useDateUtilities({ state })

    // Watch for changes in current date and reload daysales
    watch(
      currentDateYYYYMMDD,
      (currentDateYYYYMMDD) => {
        // alert('In currentDate watch! ' + currentDateYYYYMMDD)
        const year = getYearInYYYYMMYY(currentDateYYYYMMDD)
        const month = getMonthInYYYYMMYY(currentDateYYYYMMDD)
        const day = getDayInYYYYMMYY(currentDateYYYYMMDD)
        $store.dispatch('loadDayProductionBatches', { year, month, day })
      }
    )

    const headers = [
      {
        text: 'Batch No',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      { text: 'Start Time', value: 'startTime' },
      { text: 'Flour (kg)', value: 'flourQuantity' },
      { text: 'Quantity produced', value: 'quantity' },
      { text: 'Baker', value: 'baker' },
      { text: 'ProductNames', value: 'productNames', sortable: false },
      { text: 'Edit', align: 'center', value: 'actions' }
    ]

    return {
      breadctumbsItems,
      title,
      state,
      headers
    }
  },
  computed: {
    ...mapGetters([
      'dayProductionSummary',
      'totalDayProductionQuantity',
      'totalDayProductionValue',
      'productsPerProductTypeProducedOnDay',
      'dayProductionWithTotalQuantityAndProductNames'
    ]),
    ...mapState([

    ])
  },
  methods: {
    showSelectDateDialog () {
      return 'dd'
    }
  }
}
</script>
