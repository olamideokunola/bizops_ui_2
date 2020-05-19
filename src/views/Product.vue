<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'

export default {
  name: 'Product',
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

    const breadcrumbsItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Products',
        disabled: false,
        href: '/'
      },
      {
        text: 'Product',
        disabled: false,
        href: '/'
      }
    ]
    const title = ref('Product')

    return {
      breadcrumbsItems,
      title,
      state
    }
  }
}
</script>
