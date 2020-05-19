<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      overlay-color="#BAA78D"
      overlay-opacity="1"
      persistent
      fullscreen
      >
        <v-card class="d-flex pa-0 align-stretch ">
          <v-sheet class="leftbox d-md-flex flex-column hidden-md-and-down">
            <v-row class="d-flex flex-grow-0 flex-shrink-0 pb-0">
              <v-col
                class="d-flex align-self-start "
                align-self="start"
                >
                <div class="d-flex">
                  <v-img
                    src="../assets/images/tree_brown.png"
                    max-height="40"
                    max-width="60"
                    contain
                    >
                  </v-img>
                  <h2 class="p-0">Burecs</h2>
                </div>
              </v-col>
            </v-row>
            <v-row class="d-flex align-self-stretch ">
              <v-col cols="4" class="d-flex align-center">
                <v-img
                  src="../assets/images/tree_blue.png"
                  >
                </v-img>
              </v-col>
              <v-col cols="8" class="d-flex flex-column justify-center">
                <h1 class="display">
                  Bringing your <br>
                  business ideas <br>
                  to life
                </h1>
                <p>Obtain great returns on your investment <br>
                    with accurate and timely business information <br>
                    literally at your finger tips</p>
              </v-col>
            </v-row>
          </v-sheet>
          <v-sheet class="rightbox d-flex flex-column align-center justify-space-between mobile-bkg">
            <div class="pt-0 mt-0">
              <div class="logo-bkg d-flex flex-column align-center hidden-lg-and-up pt-12 pb-4 mt-0">
                <h1 class="right-box-text pb-2  hidden-md-and-up">Burecs</h1>
                <v-img
                  src="../assets/images/tree_brown.png"
                  max-height="100"
                  max-width="120"
                  contain
                  class="hidden-md-and-up"
                  >
                </v-img>
              </div>
            </div>
            <div
              :class="$vuetify.breakpoint.smAndDown ? 'd-flex pt-0 mt-0 flex-column align-center' : 'd-flex pt-0 mt-0 flex-column align-start'">
              <h2
              class="right-box-text"
              >Sign in</h2>
              <form @submit.prevent="login" class="d-flex flex-column align-center pb-0">
                <v-text-field
                  v-model="username"
                  class="pt-4 pb-0 mb-0"
                  outlined
                  :solo="$vuetify.breakpoint.smAndDown"
                  :dense="$vuetify.breakpoint.mdAndUp"
                  label="Username"
                  prepend-inner-icon="mdi-account"
                  >
                </v-text-field>
                <v-text-field
                  v-model="password"
                  class="pt-0 mt-0"
                  outlined
                  :solo="$vuetify.breakpoint.smAndDown"
                  :dense="$vuetify.breakpoint.mdAndUp"
                  type="Password"
                  label="Password"
                  prepend-inner-icon="mdi-lock"
                  >
                </v-text-field>
                <v-btn
                  rounded
                  :color="$vuetify.breakpoint.xsOnly ? '#BDA472' : '#BDA472' "
                  dark
                  width="100%"
                  type="submit"
                  x-large
                  >
                  Sign in
                </v-btn>
              </form>
              <p class="pwd p-0">Forgot your password?</p>
              <p class="err p-0">{{error}}</p>
            </div>
            <div></div>
          </v-sheet>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'

export default {
  name: 'User',
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

    const title = ref('Splash Screen')

    const dialog = ref(true)

    const username = ref('')

    const password = ref('')

    var error = ref('')

    const login = () => {
      // alert('in login')
      $store.dispatch('login', {
        username: username.value,
        password: password.value
      })
        .then(() => {
          $router.push({ name: 'DaySales' })
        })
        .catch(err => {
          error.value = err.response.data.error
        })
    }

    return {
      title,
      state,
      dialog,
      username,
      password,
      login,
      error
    }
  }
}
</script>

<style scoped>

@media only screen and (max-width: 960px) {
  .logo-bkg {
    background: white;
    border-width: 4px;
    border-style: hidden;
    border-radius: 0 0 60px 60px;
  }

  .mobile-bkg {
    background-image:  url(../assets/images/tree_blue.png), linear-gradient(to top, rgba(40,66,119,1) ,  rgba(20,33,60,1));
    background-size: 400px, 100%;
    width: 100%;
  }

  .lgcard {
    display: none;
  }

  h1 {
    color: white;
    font-style: normal;
    font-size: 24px
  }

  h2 {
    color: white;
    font-style: normal;
    font-size: 20px;
    font-weight: normal;
  }

  h1.right-box-text {
    color: #BDA472;
    font-size: 22px;
  }

  h2.right-box-text {
    color: #BDA472;
    font-size: 48px;
  }

  p {
    padding-top: 20px;
    color: #C1AFA8;
    font-style: normal;
    font-size: 12px;
  }

  .bdr {
    border-width: 4px;
    border-color: red;
    border-style: solid;
  }
}

@media only screen and (min-width: 960px) {

  h2 {
    color: white;
    font-style: normal;
    font-size: 20px;
    font-weight: normal;
  }

  h2.right-box-text {
    color: #01386E;
    font-size: 48px;
  }

  h1 {
    color: white;
    font-style: normal;
    font-size: 54px
  }

  p {
    padding-top: 20px;
    color: #C1AFA8;
    font-style: normal;
    font-size: 18px;
  }

  p.pwd {
    padding-top: 20px;
    color: #C1AFA8;
    font-style: normal;
    font-size: 14px;
    text-align: center;
  }

  p.err {
    text-align: center;
    color: red
  }

  .leftbox {
    width: 70%;
    background-color: #01386E;
  }

  .rightbox {
    width: 30%;
    background-color: white;
  }

  .bdr {
    border-width: 4px;
    border-color: red;
    border-style: solid;
  }
}
</style>
