<template>
    <v-container>
      <h4 class="subtitle-1 pt-4">Output</h4>
      <v-card
        class="pa-4 pb-2 row-bkg"
        @click.self="closeForm"
        >
        <v-card class="pa-4 white">
        <!-- Header -->
        <v-row class="d-flex align-start justify-center">
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline  align-self-md-start pa-0" >Product</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline align-self-md-start pl-0" >Good Qty</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline align-self-md-start pl-0" >Damaged Qty</div>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline align-self-md-start pl-0" >Value</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline" >Action</div>
          </v-col>
        </v-row>

        <!-- Data -->
        <v-row
          dense
          class="d-flex align-start justify-center"
          v-for="(product, id) in state.batch.products"
          :key="id"
          >
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{product.name}}</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{product.goodQuantity}}</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{product.damagedQuantity}}</div>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{product.goodQuantity * product.price}}</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <v-btn
              icon
              @click="setFieldsForEdit($event, product)"
              >
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        </v-card>

        <!--Edit row-->
        <!-- <v-row
          dense
          class="d-flex align-start justify-start pt-2"
          v-if="editBatchOutputFlag"
          >
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-select
              :items="productNamesFromProductType(producttype)"
              v-if="editBatchOutputFlag"
              solo
              background-color="white"
              hide-details
              dense
              placeholder="Product"
              v-model="editedProduct.name"
              >
            </v-select>
          </v-col>
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchOutputFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="text"
              placeholder="Quantity"
              v-model="editedProduct.goodQuantity"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-btn
              v-if="editBatchOutputFlag"
              dark
              color="#53CFCB"
              @click="updateBatchOutput"
              >
              Update
            </v-btn>
          </v-col>
        </v-row> -->
        <!-- New Row -->
        <v-row
          v-if="state.showAddLabel"
          dense
          class="pt-2">
            <v-col
              cols="12"
              md="5"
              class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div
                class="body-1 align-self-md-start pt-2"
                @click="startAddOutput"
                ><span class="text--white">+ {{ state.addLabel }}</span></div>
            </v-col>
        </v-row>
        <v-form
              class="d-md-flex justify-md-center"
              v-if="state.showForm"
              >
          <v-row
            dense
            class="pt-2">
              <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
                <v-select
                  :items="state.productNamesFromProductType"
                  outlined
                  hide-details
                  dense
                  dark
                  :disabled="state.disableProductNameField"
                  placeholder="Product"
                  label="Product"
                  v-model="state.output.productName"
                  >
                </v-select>
              </v-col>
              <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
                <v-text-field
                  outlined
                  hide-details
                  dense
                  dark
                  type="Number"
                  placeholder="Good quantity"
                  label="Good quantity"
                  v-model="state.output.goodQuantity"
                  >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
                <v-text-field
                  outlined
                  hide-details
                  dense
                  dark
                  type="Number"
                  placeholder="Damaged quantity"
                  label="Damaged quantity"
                  v-model="state.output.damagedQuantity"
                  >
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="2"
                class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
                <v-btn
                  dark
                  color="#53CFCB"
                  @click="saveData"
                  >
                  {{ state.buttonLabel }}
                </v-btn>
              </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'

export default {
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      showForm: false,
      showAddLabel: true,
      disableProductNameField: true,
      addLabel: 'Add first output',
      buttonLabel: '',
      producttype: 'Bread',
      batch: {
        id: null,
        flourQuantity: null,
        startTime: null,
        endTime: null,
        products: [],
        baker: null,
        supervisor: null,
        assistants: [],
        problems: []
      },
      output: {
        productName: '',
        goodQuantity: 0,
        damagedQuantity: 0,
        price: 0
      },
      blankOutput: {
        productName: '',
        goodQuantity: 0,
        damagedQuantity: 0,
        price: 0
      },
      fromProduct: {},
      test: {
        products: [
          {
            id: 1,
            group: 'Loaf Bread',
            name: '800g Loaf Bread',
            title: '800g Loaf Bread',
            date: {
              year: 0,
              month: 0,
              day: 0
            },
            price: '300',
            multiplePrices: false,
            prices: [],
            unit: {},
            units: []
          },
          {
            id: 2,
            group: 'Loaf Bread',
            name: '600g Loaf Bread',
            title: '600g Loaf Bread',
            date: {
              year: 0,
              month: 0,
              day: 0
            },
            price: '400',
            multiplePrices: false,
            prices: [],
            unit: {},
            units: []
          }
        ]

      },
      productNamesFromProductType: computed(() => state.test.products.map((product) => product.name))
      // productNamesFromProductType: computed(() => $store.getters.productNamesFromProductType('Bread'))
    })

    const { batchDataViewManager } = useProductionService(state)

    function startAddOutput () {
      batchDataViewManager.startAddOutput()
    }

    function saveData () {
      batchDataViewManager.saveData()
    }

    function setFieldsForEdit (e, product) {
      batchDataViewManager.setFieldsForEdit(e, product)
    }

    function closeForm () {
      batchDataViewManager.closeForm()
    }

    return {
      state,
      startAddOutput,
      saveData,
      setFieldsForEdit,
      closeForm
    }
  }
}

// Common Functions

function edit (batchDataView, state, e, product) {
  state.disableProductNameField = true

  state.output.productName = product.name
  state.output.price = Number(product.price)
  state.output.goodQuantity = product.goodQuantity
  state.output.damagedQuantity = product.damagedQuantity

  state.fromProduct = product

  state.showAddLabel = false
  state.showForm = true
  state.buttonLabel = 'Update'

  batchDataView.currentState = batchDataView.edittingDataState
}

// State Functions

const emptyState = () => {
  function startAddOutput (batchDataView, state) {
    // alert('In startAddFirstOutput!')
    state.showAddLabel = false
    state.showForm = true
    state.buttonLabel = 'Save'
    state.disableProductNameField = false

    batchDataView.currentState = batchDataView.addingDataState
  }

  return { startAddOutput }
}

const addingDataState = () => {
  const closeForm = (batchDataView, state) => {
    // alert('In adding data state closeForm')
    state.showAddLabel = true
    state.showForm = false
    state.buttonLabel = 'Save'
    batchDataView.currentState = batchDataView.emptyState
  }

  const saveData = (batchDataView, state) => {
    const newProduct = {}
    const saveProductNames = state.batch.products.map((product) => product.name)

    if (!saveProductNames.includes(state.output.productName)) {
      Object.assign(newProduct, {
        id: Number(state.test.products.find((product) => product.name === state.output.productName).id),
        name: state.output.productName,
        goodQuantity: state.output.goodQuantity,
        damagedQuantity: state.output.damagedQuantity,
        price: Number(state.test.products.find((product) => product.name === state.output.productName).price)
        // in production: price: state.store.getters.getProductPriceByName(state.output.productName)
      })
      state.batch.products.push(newProduct)

      state.showForm = false
      state.showAddLabel = true

      batchDataView.currentState = batchDataView.hasDataState
    } else {
      alert('Cannot add product because it is already in output list, edit quantity instead')

      closeForm(batchDataView, state)
    }
    Object.assign(state.output, state.blankOutput)
  }

  const setFieldsForEdit = (batchDataView, state, e, product) => {
    edit(batchDataView, state, e, product)
  }

  return { closeForm, saveData, setFieldsForEdit }
}

const hasDataState = () => {
  const setFieldsForEdit = (batchDataView, state, e, product) => {
    edit(batchDataView, state, e, product)
  }

  const startAddOutput = (batchDataView, state) => {
    // alert('In startAddFirstOutput!')
    state.showAddLabel = false
    state.showForm = true
    state.buttonLabel = 'Save'
    batchDataView.currentState = batchDataView.addingDataState
  }

  return { setFieldsForEdit, startAddOutput }
}

const edittingDataState = () => {
  const saveData = (batchDataView, state) => {
    const savedProductOutput = state.batch.products.find((product) => product.name === state.output.productName)
    savedProductOutput.goodQuantity = state.output.goodQuantity
    savedProductOutput.damagedQuantity = state.output.damagedQuantity

    state.showForm = false
    state.showAddLabel = true

    batchDataView.currentState = batchDataView.hasDataState
  }

  const closeForm = (batchDataView, state) => {
    state.showEditBatchFormFields = false

    batchDataView.currentState = batchDataView.hasDataState
  }

  const setFieldsForEdit = (batchDataView, state, e, product) => {
    edit(batchDataView, state, e, product)
  }

  return { saveData, setFieldsForEdit, closeForm }
}

class BatchDataViewManager {
  constructor (state) {
    this.emptyState = emptyState
    this.addingDataState = addingDataState
    this.hasDataState = hasDataState
    this.edittingDataState = edittingDataState

    this.currentState = this.emptyState
    this.state = state
  }

  startAddOutput () {
    const { startAddOutput } = this.currentState()
    startAddOutput(this, this.state)
  }

  closeForm () {
    const { closeForm } = this.currentState()
    // alert('Current state is: ' + this.currentState.name)
    closeForm(this, this.state)
  }

  saveData () {
    // alert('In SaveData, currentstate is ' + this.currentState.name)
    const { saveData } = this.currentState()
    saveData(this, this.state)
  }

  setFieldsForEdit (e, product) {
    const { setFieldsForEdit } = this.currentState()
    setFieldsForEdit(this, this.state, e, product)
  }
}

export function useProductionService (state) {
  const batchDataViewManager = new BatchDataViewManager(state)

  return { batchDataViewManager }
}

</script>

<style scoped>
.row-bkg {
  background-color: rgba(189,164,114,0.6);
  border-radius: 5px;
}
</style>
