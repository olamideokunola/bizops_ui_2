<template>
    <div>
      <h4 class="subtitle-1 pt-8">Batch Information</h4>
      <v-card class="pa-4 row-bkg">
        <v-card class="pa-4 white">
          <v-row
            class="d-flex align-start justify-center">
            <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline align-self-md-start" >Batch Number</div>
              <div
                class="body-1 align-self-md-start"
                >{{state.batch.id}}</div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div class="overline" >Start Time</div>
              <div
                class="body-1"
                >{{state.batch.startTime}}
              </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-self-md-start">
              <div class="overline" >Flour quantity</div>
              <div class="body-1" >{{state.batch.flourQuantity}}</div>
            </v-col>
            <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline" >Action</div>
              <v-btn
                v-if="state.showBatchInfo"
                icon
                @click="startEdit"
                >
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!--Edit row-->
        <v-row
          class="d-flex align-start justify-start"
          v-if="state.showEditBatchFormFields"
          >
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="state.showEditBatchFormFields"
              outlined
              hide-details
              dark
              dense
              type="time"
              label="Start time"
              placeholder="Start time"
              v-model="state.startTime"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="state.showEditBatchFormFields"
              outlined
              hide-details
              dark
              dense
              type="Number"
              label="Flour Quantity (kg)"
              placeholder="Flour Quantity (kg)"
              v-model="state.flourQuantity"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-btn
              v-if="state.showEditBatchFormFields"
              dark
              color="#53CFCB"
              @click="updateBatch"
              >
              Update
            </v-btn>
          </v-col>
        </v-row>

        <!-- New Row Batch Info -->
        <v-row
          v-if="state.showNewBatchFormFields || state.showSetBatchLabel"
          dense
          class="pt-2">
            <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div
                v-if="state.showSetBatchLabel"
                class="body-1 align-self-md-start pt-2"
                @click="setHeaderInfoClicked"
                >+ Set batch header
              </div>
              <v-text-field
                v-if="state.showNewBatchFormFields"
                outlined
                dark
                hide-details
                dense
                type="time"
                label="Start time"
                placeholder="Start time"
                v-model="state.newStartTime"
                >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <v-text-field
                v-if="state.showNewBatchFormFields"
                outlined
                hide-details
                dense
                dark
                type="Number"
                label="Quantity"
                placeholder="Quantity"
                v-model="state.newFlourQuantity"
                >
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="2"
              class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <v-btn
                v-if="state.showNewBatchFormFields"
                dark
                color="#53CFCB"
                @click="setFields"
                >
                Set header
              </v-btn>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            </v-col>
        </v-row>
      </v-card>
    </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'

export default {
  props: {
    batch: {
      type: Object,
      required: true
    }
  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      showSetBatchLabel: true,
      showNewBatchFormFields: false,
      batch: computed(() => props.batch),
      showBatchInfo: false,
      showEditBatchFormFields: false,
      newStartTime: null,
      newFlourQuantity: null,
      startTime: null,
      flourQuantity: null
    })

    const { batchDataViewManager } = useProductionService(state)

    function setHeaderInfoClicked () {
      batchDataViewManager.setHeaderInfoClicked()
    }

    function setFields () {
      batchDataViewManager.setFields()
    }

    function startEdit () {
      batchDataViewManager.startEdit()
    }

    function updateBatch () {
      batchDataViewManager.updateHeader()
    }

    return {
      state,
      setHeaderInfoClicked,
      setFields,
      startEdit,
      updateBatch
    }
  }
}

// Stae Functionality

function edit (batchDataView, state) {
  state.showEditBatchFormFields = true
  state.showSetBatchLabel = false

  state.startTime = state.batch.startTime
  state.flourQuantity = state.batch.flourQuantity

  batchDataView.currentState = batchDataView.editState
}

const emptyState = () => {
  function setHeaderInfoClicked (batchDataView, state) {
    // alert('In setHeaderInfoClicked!')
    state.showSetBatchLabel = false
    state.showNewBatchFormFields = true
    batchDataView.currentState = batchDataView.addDataState
  }

  return { setHeaderInfoClicked }
}

const addDataState = () => {
  const closeForm = (batchDataView, state) => {
    state.showSetBatchLabel = true
    state.showNewBatchFormFields = false

    batchDataView.currentState = batchDataView.emptyState
  }

  const setFields = (batchDataView, state) => {
    state.batch.startTime = state.newStartTime
    state.batch.flourQuantity = state.newFlourQuantity
    state.showBatchInfo = true
    state.showNewBatchFormFields = false
    batchDataView.currentState = batchDataView.hasDataState
  }
  return { closeForm, setFields }
}

const hasDataState = () => {
  const startEdit = (batchDataView, state) => {
    edit(batchDataView, state)
  }

  return { startEdit }
}

const editState = () => {
  const updateHeader = (batchDataView, state) => {
    state.showEditBatchFormFields = false

    state.batch.startTime = state.startTime
    state.batch.flourQuantity = state.flourQuantity

    batchDataView.currentState = batchDataView.hasDataState
  }

  const closeForm = (batchDataView, state) => {
    state.showEditBatchFormFields = false

    batchDataView.currentState = batchDataView.hasDataState
  }

  const startEdit = (batchDataView, state) => {
    edit(batchDataView, state)
  }

  return { updateHeader, startEdit, closeForm }
}

class BatchDataViewManager {
  constructor (state) {
    this.emptyState = emptyState
    this.addDataState = addDataState
    this.hasDataState = hasDataState
    this.editState = editState

    if (state.batch.id != null) {
      state.showBatchInfo = true
      state.showNewBatchFormFields = false
      state.showSetBatchLabel = false

      this.currentState = this.hasDataState
    } else {
      this.currentState = this.emptyState
    }
    // alert('In constructor, currentState is: ' + this.currentState.name)
    this.state = state
    // state.showSetBatchLabel = falsealert('In constructor, initial state is: ' + this.currentState.name)
  }

  setHeaderInfoClicked () {
    const { setHeaderInfoClicked } = this.currentState()
    // alert('In setHeaderInfoClicked, currentState is: ' + this.currentState.name)
    setHeaderInfoClicked(this, this.state)
  }

  closeForm () {
    const { closeForm } = this.currentState()
    closeForm(this, this.state)
  }

  setFields () {
    const { setFields } = this.currentState()
    setFields(this, this.state)
  }

  startEdit () {
    const { startEdit } = this.currentState()
    startEdit(this, this.state)
  }

  updateHeader () {
    const { updateHeader } = this.currentState()
    updateHeader(this, this.state)
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
