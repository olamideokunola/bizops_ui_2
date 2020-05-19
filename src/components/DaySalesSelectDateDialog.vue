<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        fullscreen
        >

      <v-card>
        <v-container>
          <!-- Tool Bar -->
          <v-row>
            <v-col cols="12">
              <h1>Select Date</h1>
            </v-col>
            <v-col cols="12">
              <v-toolbar
                dense
                color="#81C8EE"
                dark
                >

                <v-toolbar-title class="pr-6">{{ currentDate }}</v-toolbar-title>
                <v-btn
                  icon
                  @click="previousMonth"
                  >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>

                <v-btn
                  icon
                  @click="nextMonth"
                  >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="secondary"
                  >
                  pcs
                </v-chip>

                <v-chip
                  class="ma-2"
                  color="secondary"
                  >
                  &#8358;{{state.totalMonthSalesAmount}}
                </v-chip>
              </v-toolbar>

            </v-col>
          </v-row>

          <!-- Calender -->
          <v-row class="pt-0">
            <v-col>
              <v-sheet height="400">
                <v-calendar
                  ref="calendar"
                  :now="todaysDateYYYYMMDD"
                  :value="currentDateYYYYMMDD"
                  :events="state.monthSales"
                  color="primary"
                  type="month"
                  @click:date='setcurrentDateYYYYMMDD'
                  :event-more=false
                ></v-calendar>
              </v-sheet>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
              >
                Select
              </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { computed, reactive, watch } from '@vue/composition-api'

import { useDateUtilities } from '../utilities/dateUtils'

export default {
  components: {

  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit, root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      monthSales: computed(() => {
        return $store.getters.monthSaleDailyTotals.map((daySale) => {
          return {
            name: String(daySale.totalAmount),
            start: daySale.date
          }
        })
      }),
      totalMonthSalesAmount: computed(() => {
        const monthAmounts = $store.getters.monthSaleDailyTotals.map((daySale) => Number(daySale.totalAmount))
        if (monthAmounts.length > 0) {
          return monthAmounts.reduce((total, dayAmount) => total + dayAmount)
        }
      })
    })

    var dialog = computed({
      get: () => props.showDialog,
      set: (val) => {
        emit('update:showDialog', val)
      }
    })

    const {
      setcurrentDateYYYYMMDD,
      previousMonth,
      nextMonth,
      currentDate,
      currentDateYYYYMMDD,
      todaysDate,
      todaysDateYYYYMMDD,
      currentMonth,
      currentYear
    } = useDateUtilities({ state })

    // load month sales from backend
    // state.store.dispatch('getMonthSales', { currentYear, currentMonth })

    watch(
      dialog,
      (dialog) => {
        if (dialog === true) {
          state.store.dispatch('getMonthSales', { currentYear, currentMonth })
        }
      }
    )

    return {
      state,
      dialog,
      todaysDate,
      todaysDateYYYYMMDD,
      currentDateYYYYMMDD,
      currentDate,
      nextMonth,
      previousMonth,
      setcurrentDateYYYYMMDD
    }
  }
}
</script>

<style scoped>

</style>
