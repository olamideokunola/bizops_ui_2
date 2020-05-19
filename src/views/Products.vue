<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'

export default {
  name: 'Products',
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

    const title = ref('Products')

    return {
      title,
      state
    }
  }
}
</script>
