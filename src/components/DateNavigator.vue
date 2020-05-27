<template>
  <div class="d-flex align-center">
    <v-subheader class="pr-6">{{ currentDate }}</v-subheader>

    <v-btn
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
    x-small
    color="#53CFCB"
    fab
    dark
    @click="$emit('showSelectDateDialog')"
    >
    <v-icon small>mdi-calendar-today</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { useDateUtilities } from '../utilities/dateUtils'

export default {
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
