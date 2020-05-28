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
      <DateNavigator v-on:showSelectDateDialog="showSelectDateDialog"></DateNavigator>
    </v-toolbar>

    <v-container >
      <!-- Title -->
      <v-row class="pt-0 mt-0 mb-0">
        <v-col
          cols="6"
        >
          <h1>{{ title }}</h1>
        </v-col>
        <v-col
          cols="6"
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

      <!-- Content-->
      <v-row>
        <v-col
            cols="12" md="6"
            class="my-4"
            v-for="(item, index) in dayProductionSummary"
            :key="index"
          >
          <v-card
            class="mx-auto"
            >
            <v-card-title class="display-1 font-weight-light">{{ item.productTypeName }} Batches</v-card-title>

            <!--Price chips -->
            <div class="ml-2 mb-2">
              <v-chip
                class="mb-2 ml-2"
                color="grey"
                dark
                small
                outlined
                v-for="(itm, id) in item.productsPerProductTypeProducedOnDay"
                :key=id
                >
                {{itm}}
              </v-chip>
            </div>
            <v-list
              class="px-4 pt-0 mt-0 pb-0"
              v-for="(name, key) in item"
              :key="key"
              >
              <v-list-item-group color="primary" v-if="key!=='productTypeName' && key!=='productsPerProductTypeProducedOnDay'">
                <v-list-item
                  >
                  <v-list-item-avatar>
                    <v-icon
                      large
                      color="rgba(189,164,114,1)"
                      v-text="name.icon"
                    ></v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="name.item"></v-list-item-title>
                    <v-list-item-subtitle v-text="name.title"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-divider
                class="pt-0 mt-0"
                ></v-divider>
            </v-list>

            <v-card-actions
              class="pa-4"
              >
              <v-spacer></v-spacer>
              <v-btn
                color="#53CFCB"
                small
                dark
                fab
                to="/production/batches"
                >
                <v-icon
                  dark
                  >
                  mdi-eye
                </v-icon>
              </v-btn>
              <v-btn
                color="#53CFCB"
                fab
                small
                dark
                :to="{ name:'productionBatchNew', params: {  producttype: item.productTypeName }}"
                >
                <v-icon
                  dark
                  >
                  mdi-plus
                </v-icon>

              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
import { mapGetters } from 'vuex'
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
        disabled: true,
        href: '/'
      }
    ]
    const title = ref('Production Summary')
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

    return {
      breadctumbsItems,
      title,
      state
    }
  },
  computed: {
    ...mapGetters([
      'dayProductionSummary',
      'totalDayProductionQuantity',
      'totalDayProductionValue',
      'productsPerProductTypeProducedOnDay'
    ])
  },
  methods: {
    showSelectDateDialog () {
      return 'dd'
    }
  }
}
</script>
