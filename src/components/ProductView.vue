<template>
  <div>
    <!-- Product Information -->
    <v-card >
      <v-card-subtitle>{{title}}</v-card-subtitle>
      <v-card-text>
        <v-form>
          <!-- Identification-->
          <v-row>
            <v-col cols="12" md="4" class="pb-0 mb-0 pl-4">
              <v-text-field
                v-model="name"
                label="Name"
                type="text"
                outlined
                dense
                >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="pb-0 mb-0 pl-4">
              <v-autocomplete
                v-model="selectedGroup"
                label="Group"
                type="text"
                outlined
                dense
                :items="productGroups"
                chips
                small-chips
                >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="4" class="pb-0 mb-0 pl-4">
              <v-autocomplete
                v-model="selectedUnits"
                label="Unit"
                type="text"
                outlined
                dense
                :items="units"
                chips
                small-chips
                multiple
                >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="8" class="pb-0 mb-0 pl-4">
              <v-file-input
                v-model=imageFile
                :label="title === 'New Product' ? 'Select Image' : 'Change Image'"
                dense
                outlined
                prepend-icon="mdi-camera"
                @change="onFileSelected"
              ></v-file-input>
              <div>
                <v-img :src="imagePreviewUrl"></v-img>
              </div>
            </v-col>
          </v-row>
          <v-row class="pt-4">
            <v-col>
              <v-btn
                v-if="title=='New Product'"
                color="#53CFCB"
                dark
                @click="createProduct"
                >
                Create Product
              </v-btn>
              <v-btn
                v-else
                color="#53CFCB"
                dark
                @click="updateProduct"
                >
                Update Product
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card
      v-if="title=='New Product'"
      class="mt-4"
      >
      <v-card-subtitle>Product List</v-card-subtitle>
      <v-card-text>
        <v-list
          two-line
          v-for="(product, index) in products"
          v-bind:key=product.id
          >
            <v-list-item class="pb-4 pt-0 mt-0">
              <v-row dense>
                <v-col cols="12" md="3">
                  <v-card
                    class="pa-4"
                    width="200"
                    flat
                    outlined
                    >
                    <v-img :src="product.imgsrc" max-width="500px"></v-img>
                  </v-card>
                </v-col>
                <v-col cols="12" md="9">
                  <v-row dense>
                    <v-list-item-content class="pl-4">
                      <v-list-item-title>{{product.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{product.group}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-btn
                        icon
                        :to="'/product/' + product.name + '/edit'"
                        >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                       icon
                       @click="deleteProduct(product.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-icon>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item>
          <v-divider
            class = "pb-0 mb-0"
              v-if="index + 1 < products.length"
              :key="index"
            ></v-divider>
        </v-list>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'

export default {
  name: 'ProductView',
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    product: {
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

    var id = ref('')
    var name = ref('')
    var selectedGroup = ref('')
    const productGroups = $store.state.product.productGroups.map((group) => group.name)
    var selectedUnits = ref([])
    var imageFile = ref(null)
    var imagePreviewUrl = ref('')

    if (props.title === 'New Product') {
      // alert('In component: New Product!')
      id.value = state.store.state.product.newProduct.id
      name.value = state.store.state.product.newProduct.name
      selectedGroup.value = state.store.state.product.newProduct.group
      selectedUnits.value = state.store.state.product.newProduct.units
      imageFile = ref(null)
    } else if (props.title === 'Edit Product') {
      id = state.store.state.product.editProduct.id
      name = state.store.state.product.editProduct.name
      selectedGroup = state.store.state.product.editProduct.group
      selectedUnits = computed({
        get: () => state.store.state.product.editProduct.units.map((unit) => unit.long),
        set: (unit) => { state.store.state.product.editProduct.units = unit }
      })
      imageFile = ref(null)
      imagePreviewUrl.value = state.store.state.product.editProduct.imgsrc
    }

    const newProduct = props.product

    var selectedFile = ref(null)

    var add = ref(true)

    const toggleAddEdit = () => {
      add.value = !add.value
    }

    const onFileSelected = (event) => {
      console.log(event)
      selectedFile = event
      imagePreviewUrl.value = URL.createObjectURL(selectedFile)
    }

    const units = computed(() => state.store.state.product.units.map((unit) => unit.long))
    const products = computed(() => state.store.state.product.products)

    const createProduct = () => {
      // upload file
      // alert('In Component Create Product: name is: ' + name.value)
      // alert('In Component Create Product: group is: ' + selectedGroup.value)
      // alert('In Component Create Product: units are: ' + selectedUnits.value.length)
      // alert('In Component Create Product: name is: ' + name.value)
      $store.dispatch('createProduct', {
        name: name.value,
        group: selectedGroup.value,
        units: selectedUnits.value.map((unitlongname) => state.store.state.product.units.find((unit) => unit.long === unitlongname)),
        selectedFile: selectedFile
      }).then(() => {
        Object.assign(state.store.state.product.newProduct, {})
        name.value = ''
        selectedGroup.value = ''
        selectedUnits.value = ''
        imageFile.value = null
        selectedFile.value = null
        imagePreviewUrl.value = ''
      })
    }

    const updateProduct = () => {
      // upload file
      // alert('In Component updateProduct Id: ' + id)
      $store.dispatch('updateProduct', {
        id: id,
        name: name,
        group: selectedGroup,
        units: selectedUnits.value.map((unitlongname) => state.store.state.product.units.find((unit) => unit.long === unitlongname)),
        selectedFile: selectedFile
      }).then(() => {
        $router.push('/products/productlist')
      })
    }

    const deleteProduct = (event) => {
      $store.dispatch('deleteProduct', { id: event })
        .then(
          // alert('Product Deleted!')
        )
    }

    return {
      state,
      id,
      name,
      selectedGroup,
      productGroups,
      newProduct,
      add,
      toggleAddEdit,
      onFileSelected,
      createProduct,
      deleteProduct,
      selectedUnits,
      units,
      products,
      updateProduct,
      imageFile,
      imagePreviewUrl
    }
  }
}
</script>

<style scoped>
imgbox {
  width: 100px;
  border: 2px-solid
}
</style>
