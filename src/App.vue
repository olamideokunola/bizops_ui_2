<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-if="state.store.state.showNav"
      v-model="state.drawer"
      :mini-variant.sync="state.mini"
      app
      clipped
      dark
      color="#01386E"
      >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon dark>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>{{$store.getters.loggedInUser}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="state.mini = !state.mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in state.NavItems"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              >
                {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in state.store.state.contextualNavMenuItems"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar
      v-if="state.store.state.showNav"
      app
      color="#0B7ABF"
      dark
      clipped-left
      >

      <!-- App Nav Icon -->
      <v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Burecs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="logout"
        >
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <!--v-chip
        color="#ffffff"
        light
        small
        >
        <span class="overline">User: </span>
        <span class="overline pl-2"> {{ loggedInUser}}</span>
      </v-chip-->
    </v-app-bar>

    <!-- Content -->
    <v-content>
      <v-sheet
          color="#F0F0F0"
          height="100%"
        >
          <router-view></router-view>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>

import { reactive } from '@vue/composition-api'

import { authComputed } from '../src/store/helpers.js'

export default {
  name: 'App',

  components: {

  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      NavItems: [
        { title: 'Day Sales', icon: 'mdi-sale', path: '/' },
        // { title: 'Sales Reports', icon: 'mdi-image', path: '/' },
        { title: 'Products', icon: 'mdi-food-croissant', path: '/products/productlist' },
        // { title: 'Customers', icon: 'mdi-help-box', path: '/' },
        { title: 'Production', icon: 'mdi-cogs', path: '/production/summary' },
        { title: 'Users', icon: 'mdi-account-group', path: '/users/userlist' }
      ],
      drawer: null,
      mini: true
    })

    const showNav = $store.state.showNav

    const logout = () => {
      // alert('Logout')
      $store.dispatch('logout')
    }

    return {
      state,
      showNav,
      logout
    }
  },
  computed: {
    ...authComputed
  }
}
</script>

<!-- style src="./assets/tailwind.css"-->

<style>
body {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 22px;
}

h1, h2, p {
  font-family: 'ZCOOL XiaoWei', serif;
}

</style>
