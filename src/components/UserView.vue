<template>
  <div>
    <!-- Profile -->
    <v-card >
      <v-card-title>Profile</v-card-title>
      <v-card-text>
        <v-form>
          <!-- Identification-->
          <v-row class="pb-0 mb-0">
            <v-col cols="12" md="4" class="pb-0 mb-0 pl-0">
              <v-card-subtitle class="text--disabled overline">Identification</v-card-subtitle>
            </v-col>
            <v-col  class="pb-0 mb-0">
              <v-row class="pb-0 mb-0">
                <v-col cols="12" md="6" class="pb-0 mb-0">
                  <v-text-field
                  class="pb-0 mb-0"
                    v-model="newUser.firstname"
                    outlined
                    dense
                    label="First name"
                    >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0 mb-0">
                  <v-text-field
                    v-model="newUser.lastname"
                    outlined
                    dense
                    label="Last name"
                    >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="pa-0 ma-0">
                <v-col class="pa-0 ma-0">
                  <v-text-field
                    v-model="newUser.username"
                    outlined
                    dense
                    label="Username"
                    >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <!-- Password-->
          <v-row class="pb-0 mb-0">
            <v-col cols="12" md="4" class="pb-0 mb-0 pl-0">
              <v-card-subtitle class="text--disabled overline">Password</v-card-subtitle>
            </v-col>
            <v-col class="pb-0 mb-0">
              <v-row class="pb-0 mb-0">
                <v-col cols="12" md="6" class="pb-0 mb-0">
                  <v-text-field
                    class="pb-0 mb-0"
                    v-model="newUser.password"
                    outlined
                    dense
                    type="password"
                    label="Password"
                    >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0 mb-0">
                  <v-text-field
                  class="pb-0 mb-0"
                    v-model="newUser.confirmpassword"
                    outlined
                    dense
                    type="password"
                    label="Confirm Password"
                    >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-divider class="pt-0 mt-0"></v-divider>

          <!-- Contact-->
          <v-row>
            <v-col cols="12" md="4" class="pb-0 mb-0 pl-0">
              <v-card-subtitle class="text--disabled overline">Contact</v-card-subtitle>
            </v-col>
            <v-col cols="12" md="4" class="pb-0 mb-0">
              <v-text-field
                v-model="newUser.phonenumber"
                outlined
                dense
                label="Phone"
                >
              </v-text-field>
              <v-text-field
                v-model="newUser.email"
                outlined
                dense
                type="email"
                label="Email"
                >
              </v-text-field>
            </v-col>
            <v-col>
              <v-textarea
                v-model="newUser.address"
                label="Address"
                auto-grow
                outlined
                rows="4"
                row-height="24"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Authorizations -->
    <v-card class="mt-4">
      <!-- Tool Bar -->
      <v-toolbar
        dense
        color="#ffffff"
        light
        flat
        >
        <v-toolbar-title class="pr-6">Authorizations</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-card-subtitle class="text--disabled overline pl-0">New Authorization</v-card-subtitle>
          <v-row dense>
            <v-col cols="12" md="4">
              <v-select
                :items="models"
                label="Model"
                outlined
                dense
                v-model="authorization.model"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="[true, false]"
                label="Create"
                outlined
                dense
                v-model="authorization.create"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="[true, false]"
                label="Edit"
                outlined
                dense
                v-model="authorization.edit"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="[true, false]"
                label="View"
                outlined
                dense
                v-model="authorization.view"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2" >
              <v-select
                :items="[true, false]"
                label="Delete"
                outlined
                dense
                v-model="authorization.delete"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="2"
              >
              <v-btn
                color="#53CFCB"
                dark
                @click="addAuthorization"
                v-if="add"
                >
                Add Authorization
              </v-btn>
              <v-btn
                color="red"
                dark
                @click="updateAuthorization"
                v-if="!add"
                >
                Update Authorization
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-card-subtitle class="text--disabled overline pl-0 mt-4">Authorization List</v-card-subtitle>
        <v-data-table
          :headers="authorizationHeaders"
          :items="authorizations"
          item-key="authorization.id"
          class="elevation-1 mt-0"
          >

          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editAuthorization(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteAuthorization(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Groups -->
    <v-card class="mt-4">
      <!--v-card-title>Authorizations</v-card-title-->
      <!-- Tool Bar -->
      <v-toolbar
        dense
        color="#ffffff"
        light
        flat
        >
        <v-toolbar-title class="pr-6">Groups</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
        fab
        x-small
        color="#53CFCB"
        dark
        >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>

      </v-toolbar>
      <v-card-text>
        <!-- Group Selection -->
        <v-card-subtitle class="text--disabled overline pl-0 mt-4">Select Group</v-card-subtitle>
        <v-row dense>
          <v-col cols="12" md="10">
            <v-autocomplete
              v-model="selectedGroup"
              :items="groupDescriptions"
              outlined
              dense
              chips
              small-chips
              label="Group"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-btn
              color="#53CFCB"
              dark
              @click="addGroup"
              >
              Add Group
            </v-btn>
          </v-col>
        </v-row>
        <!-- Group List -->
        <v-card-subtitle class="text--disabled overline pl-0 mt-4">Group List</v-card-subtitle>
        <v-list-item
          v-for="item in newUser.groups"
          :key="item.title"
          >
          <v-list-item-avatar>
            <v-avatar color="indigo" size="36">
              <span class="white--text">{{item.description.substr(0,1).toUpperCase()}}G</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.description"></v-list-item-title>
            <v-list-item-subtitle v-text="item.details"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              @click="deleteGroup(item)"
              >
              <v-icon color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'

export default {
  name: 'NewUser',
  components: {
  },
  props: {
    user: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store
    })

    const id = ref('')
    const username = ref('')
    const password = ref('')
    const confirmpassword = ref('')
    const firstname = ref('')
    const lastname = ref('')
    const email = ref('')
    const phonenumber = ref('')
    const address = ref('')

    const authorizations = computed(() => {
      return props.user.authorizations
    })

    const authorizationHeaders = ref([
      {
        text: 'Model',
        align: 'start',
        sortable: false,
        value: 'model'
      },
      {
        text: 'Create',
        align: 'start',
        sortable: false,
        value: 'create'
      },
      {
        text: 'Edit',
        align: 'start',
        sortable: false,
        value: 'edit'
      },
      {
        text: 'View',
        align: 'start',
        sortable: false,
        value: 'view'
      },
      {
        text: 'Delete',
        align: 'start',
        sortable: false,
        value: 'delete'
      },
      {
        text: 'Action',
        align: 'start',
        sortable: false,
        value: 'actions'
      }
    ])

    var authorization = ref({
      id: 0,
      description: '',
      model: '',
      create: null,
      edit: null,
      view: null,
      delete: null,
      added: null,
      status: ''
    })

    const blankAuthorization = ref({
      id: 0,
      description: '',
      model: '',
      create: null,
      edit: null,
      view: null,
      delete: null,
      added: null,
      status: ''
    })

    const group = ref({
      id: 0,
      description: '',
      details: '',
      added: false,
      authorizations: []
    })

    const blankGroup = ref({
      id: 0,
      description: '',
      details: '',
      added: false,
      authorizations: []
    })

    const newUser = computed(() => props.user)

    const addAuthorization = () => {
      // alert('In addAuthorization')

      authorization.value.description = authorization.value.model.toLowerCase() + '_auth'

      // alert('In addAuthorization description is ' + authorization.value.description)

      const authExists = () => {
        // alert('In addAuthorization, authExists')
        if (newUser.value.authorizations.length > 0) {
          return newUser.value.authorizations.find((auth) => authorization.value.model === auth.model)
        } else {
          return null
        }
      }

      if (authExists() === null || !authExists()) {
        newUser.value.authorizations.push({ ...authorization.value })
        Object.assign(authorization.value, blankAuthorization.value)
        // authorization.value.model = ''
      }
    }

    const models = $store.state.models.map((model) => model.title).sort()

    var add = ref(true)

    const toggleAddEdit = () => {
      add.value = !add.value
    }

    const editAuthorization = (auth) => {
      toggleAddEdit()
      Object.assign(authorization.value, auth)
    }

    const updateAuthorization = () => {
      toggleAddEdit()
      var edittedAuth = newUser.value.authorizations.find((auth) => auth.model === authorization.value.model)
      // alert(edittedAuth.model)
      Object.assign(edittedAuth, authorization.value)
      Object.assign(authorization.value, blankAuthorization.value)
    }

    const deleteAuthorization = (authToDelete) => {
      // alert(authToDelete.description)
      const authExists = newUser.value.authorizations.find((auth) => authToDelete.description === auth.description)
      if (authExists) {
        newUser.value.authorizations.splice(newUser.value.authorizations.indexOf(authExists), 1)
      }
    }

    const groups = $store.state.groups

    const groupDescriptions = groups.map((group) => group.description)

    const selectedGroup = ref({})

    const addGroup = () => {
      const groupExists = newUser.value.groups.find((grp) => selectedGroup.value === grp.description)
      const groupToAdd = groups.find((grp) => selectedGroup.value === grp.description)

      if (!groupExists) {
        newUser.value.groups.push({ ...groupToAdd })
        Object.assign(group.value, blankGroup.value)
      }
    }

    const deleteGroup = (groupToDelete) => {
      // alert(groupToDelete.description)
      const groupExists = newUser.groups.find((grp) => groupToDelete.description === grp.description)
      if (groupExists) {
        newUser.groups.splice(newUser.groups.indexOf(groupExists), 1)
      }
    }

    return {
      state,
      id,
      username,
      password,
      confirmpassword,
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      authorization,
      group,
      models,
      authorizations,
      addAuthorization,
      authorizationHeaders,
      newUser,
      editAuthorization,
      updateAuthorization,
      add,
      groups,
      groupDescriptions,
      selectedGroup,
      addGroup,
      deleteGroup,
      deleteAuthorization
    }
  }
}
</script>
