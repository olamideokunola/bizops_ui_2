<template>
    <div>
      <h4 class="subtitle-1 pt-8">Labour Information</h4>
      <v-card
        class="pa-4 row-bkg"
        @click.self="closeForm"
        >
        <v-card class="pa-4 white">
          <v-row
            class="d-flex align-start justify-center">
            <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline align-self-md-start" >Baker</div>
              <div v-if="state.showBatchLabour" class="body-1 align-self-md-start" >{{state.batch.baker}}</div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div class="overline" >Supervisor</div>
              <div
                class="body-1"
                >{{state.batch.supervisor}}
              </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-self-md-start">
              <div class="overline" >Assistants</div>
              <div
                v-if="state.batch.assistants && state.batch.assistants.length > 0"
                class="body-1"
                >
                {{state.batch.assistants.join(', ')}}</div>
            </v-col>
            <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline" >Action</div>
              <v-btn
                v-if="state.showBatchLabour"
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
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="state.showEditBatchFormFields"
              outlined
              hide-details
              dark
              dense
              type="text"
              label="Baker"
              placeholder="Baker"
              v-model="state.baker"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="state.showEditBatchFormFields"
              outlined
              hide-details
              dark
              dense
              type="text"
              label="Supervisor"
              placeholder="Supervisor"
              v-model="state.supervisor"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="state.showEditBatchFormFields"
              outlined
              hide-details
              dark
              dense
              type="text"
              label="Assistants"
              placeholder="Assistants"
              v-model="state.assistants"
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

        <!-- New Row Labour Info -->
        <v-row
          v-if="state.showNewBatchFormFields || state.showSetBatchLabel"
          dense
          class="pt-2">
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div
                v-if="state.showSetBatchLabel"
                class="body-1 align-self-md-start pt-2"
                @click="setLabourInfoClicked"
                >+ Set batch labour
              </div>
              <v-text-field
                v-if="state.showNewBatchFormFields"
                outlined
                dark
                hide-details
                dense
                type="text"
                label="Baker"
                placeholder="Baker"
                v-model="state.newBaker"
                >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <v-text-field
                v-if="state.showNewBatchFormFields"
                outlined
                hide-details
                dark
                dense
                type="text"
                label="Supervisor"
                placeholder="Supervisor"
                v-model="state.newSupervisor"
                >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <v-text-field
                v-if="state.showNewBatchFormFields"
                outlined
                hide-details
                dark
                dense
                type="text"
                label="Assistants"
                placeholder="Assistants"
                v-model="state.assistants"
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
                Set labour
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
      showBatchLabour: false,
      showEditBatchFormFields: false,
      newBaker: null,
      newSupervisor: null,
      newAssistants: [],
      baker: null,
      supervisor: null,
      assistants: []
    })

    const { batchDataViewManager } = useProductionService(state)

    function setLabourInfoClicked () {
      batchDataViewManager.setLabourInfoClicked()
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

    function closeForm () {
      batchDataViewManager.closeForm()
    }

    return {
      state,
      setLabourInfoClicked,
      setFields,
      startEdit,
      updateBatch,
      closeForm
    }
  }
}

// Common Functions

function edit (batchDataView, state) {
  state.showEditBatchFormFields = true
  state.showSetBatchLabel = false

  state.baker = state.batch.baker
  state.supervisor = state.batch.supervisor

  if (state.assistants) {
    state.assistants = state.batch.assistants.join(', ')
  }

  batchDataView.currentState = batchDataView.editState
}

// State Functions

const emptyState = () => {
  function setLabourInfoClicked (batchDataView, state) {
    // alert('In setLabourInfoClicked!')
    state.showSetBatchLabel = false
    state.showNewBatchFormFields = true
    batchDataView.currentState = batchDataView.addDataState
  }

  return { setLabourInfoClicked }
}

const addDataState = () => {
  const closeForm = (batchDataView, state) => {
    state.showSetBatchLabel = true
    state.showNewBatchFormFields = false

    batchDataView.currentState = batchDataView.emptyState
  }

  const setFields = (batchDataView, state) => {
    state.batch.baker = state.newBaker
    state.batch.supervisor = state.newSupervisor

    if (state.assistants) {
      state.batch.assistants = state.assistants.split(', ')
    }

    state.showBatchLabour = true
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

    state.batch.baker = state.baker
    state.batch.supervisor = state.supervisor

    if (state.assistants) {
      state.batch.assistants = state.assistants.split(', ')
    }

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
      state.showBatchLabour = true
      state.showNewBatchFormFields = false
      state.showSetBatchLabel = false

      this.currentState = this.hasDataState
    } else {
      this.currentState = this.emptyState
    }

    this.state = state
  }

  setLabourInfoClicked () {
    const { setLabourInfoClicked } = this.currentState()
    setLabourInfoClicked(this, this.state)
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
