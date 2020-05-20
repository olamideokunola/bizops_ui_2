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
        @click=saveNewUser
        >
        <v-icon>mdi-content-save</v-icon>
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
      <new-user
        title="New User"
        :user="user"
        >

      </new-user>

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

import NewUser from '../components/UserView'

export default {
  name: 'UserNew',
  components: {
    'new-user': NewUser
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
        href: '/'
      },
      {
        text: 'New User',
        disabled: false,
        href: '/'
      }
    ]
    const title = ref('New User')

    const user = computed(() => $store.state.newUser)

    const saveNewUser = () => {
      $store.dispatch('saveUser')
        .then(() => {
          alert('In UserNew, User saved')
          $router.push('/user/' + user.value.username + '/edit')
          Object.assign($store.state.newUser, {
            id: '',
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            authorizations: [],
            groups: []
          })
          $store.dispatch('showSnackBarMessage', { message: 'User data saved successfully!' })
        })
    }

    return {
      breadcrumbsItems,
      title,
      state,
      saveNewUser,
      user
    }
  }
}
</script>
