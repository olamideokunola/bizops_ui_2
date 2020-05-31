<template>
  <v-container class="d-flex pa-0 align-center justify-space-between">
    <v-subheader class="pa-0">{{ currentDate }}</v-subheader>
    <div>
      <v-btn
        v-if="showNavButtons"
        class="mr-2"
        x-small
        color="#53CFCB"
        fab
        outlined
        @click="previousDay"
        >
      <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        v-if="showNavButtons"
        class="mr-2"
        x-small
        color="#53CFCB"
        fab
        @click="nextDay"
        outlined
        >
      <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>

      <v-btn
        v-if="showNavButtons"
        x-small
        color="#53CFCB"
        fab
        dark
        @click="$emit('showSelectDateDialog')"
        >
      <v-icon small>mdi-calendar-today</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { useDateUtilities } from '../utilities/dateUtils'

export default {
  props: {
    showNavButtons: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store
    })
    const { currentDate, nextDay, previousDay } = useDateUtilities({ state })

    return {
      currentDate, nextDay, previousDay
    }
  }
}
</script>

<style>

</style>
