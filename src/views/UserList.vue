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
      <v-row
          >
          <v-col cols="12" xl="3" lg="3" md="4"
          v-for="user in users"
          v-bind:key='user.username'
          >
            <v-card>
                <v-card-title>{{user.firstname}} {{user.lastname}}</v-card-title>
                <v-card-text>
                  <div class="overline text--disabled">Username</div>
                  <p class="subtitle-1">{{user.username}}</p>

                  <div class="overline text--disabled">Email</div>
                  <p >{{user.email}}</p>

                  <div class="overline text--disabled">Phone</div>
                  <p class="subtitle-1">{{user.phonenumber}}</p>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="pl-4 pr-4">
                    <v-btn
                      fab
                      x-small
                      color="#53CFCB"
                      outlined
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>

                     <v-spacer></v-spacer>

                    <v-btn
                        fab
                        x-small
                        dark
                        color="#53CFCB"
                        :to="'/user/'+user.username+'/edit'"
                      >
                        <v-icon>
                          mdi-pencil
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
import { ref, reactive, computed } from '@vue/composition-api'

export default {
  name: 'Users',
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

    const breadctumbsItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Users',
        disabled: true,
        href: '/'
      }
    ]
    const title = ref('Users')

    var users = null

    $store.dispatch('loadUsers')
      .then(
        users = computed(() => $store.state.user.users)
      )

    return {
      breadctumbsItems,
      title,
      state,
      users
    }
  }
}
</script>
