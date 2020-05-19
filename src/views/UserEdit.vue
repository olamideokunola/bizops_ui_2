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
        @click=saveEdittedUser
        >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>

      <v-btn
        class="ml-4"
        x-small
        color="#53CFCB"
        fab
        dark
        to="/users/new"
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
      <edit-user
        :user=user
        >

      </edit-user>

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

import EditUser from '../components/UserView'

export default {
  name: 'UserEdit',
  components: {
    'edit-user': EditUser
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
        text: 'Users',
        disabled: false,
        href: '#/users/userlist'
      },
      {
        text: 'User',
        disabled: true,
        href: '/'
      },
      {
        text: 'Edit',
        disabled: true,
        href: '/'
      }
    ]
    const title = ref('Edit User')

    const user = computed(() => $store.state.users.find((user) => user.username === $route.params.username))

    const saveEdittedUser = () => {
      $store.state.newUser = user.value
      $store.dispatch('saveUser')
        .then(() => {
          // alert('In UserEdit, User saved')
          // $router.push('/user/' + user.value.username + '/edit')
          Object.assign($store.state.newUser, {})
          $store.dispatch('showSnackBarMessage', { message: 'User data saved successfully!' })
        })
    }

    return {
      breadcrumbsItems,
      title,
      state,
      user,
      saveEdittedUser
    }
  }
}
</script>
