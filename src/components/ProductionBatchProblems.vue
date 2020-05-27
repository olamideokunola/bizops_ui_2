<template>
    <div>
      <h4 class="subtitle-1 pt-8">Problems</h4>
      <v-card
        class="pa-4 pb-2 row-bkg"
        @click.self="closeForm"
        >
        <v-card class="pa-4 white hidden-sm-and-down">
        <!-- Header -->
        <v-row class="d-flex align-start justify-center">
          <v-col cols="12" md="10" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline  align-self-md-start pa-0" >Problem</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline" >Action</div>
          </v-col>
        </v-row>

        <!-- Data -->
        <v-row
          dense
          class="d-flex align-start justify-center"
          v-for="(problem, id) in state.batch.problems"
          :key="id"
          >
          <v-col cols="12" md="10" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{problem}}</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <v-btn
              icon
              @click="setFieldsForEdit($event, problem)"
              >
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        </v-card>

        <!-- Mobile Data Card -->
        <div
          class="hidden-md-and-up"
          v-for="(problem, id) in state.batch.problems"
          :key="id"
          >
          <v-card class="pa-4 white mt-2">
            <v-row class="d-flex align-start justify-center">
              <v-col cols="12" md="10" class="d-flex flex-column justify-space-between">
                <div class="overline  align-self-md-start pa-0" >Problem</div>
                <div class="body-1 align-self-md-start" >{{problem}}</div>
              </v-col>
              <v-col cols="12" md="2" class="d-flex flex-column align-end">
                <div class="overline" >Action</div>
                <v-btn
                  icon
                  @click="setFieldsForEdit($event, problem)"
                  >
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <!-- Form Row -->
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
                @click="startAddProblem"
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
              <v-col cols="12" md="10" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
                <v-text-field
                  outlined
                  hide-details
                  dense
                  dark
                  placeholder="Problem"
                  label="Problem"
                  v-model="state.problem"
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
      showForm: false,
      showAddLabel: true,
      disableField: true,
      addLabel: 'Add first problem',
      buttonLabel: '',
      producttype: 'Bread',
      batch: computed(() => props.batch),
      problem: '',
      fromProblem: '',
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

      }
    })

    const { batchDataViewManager } = useProductionService(state)

    function startAddProblem () {
      batchDataViewManager.startAddProblem()
    }

    function saveData () {
      batchDataViewManager.saveData()
    }

    function setFieldsForEdit (e, problem) {
      batchDataViewManager.setFieldsForEdit(e, problem)
    }

    function closeForm () {
      batchDataViewManager.closeForm()
    }

    return {
      state,
      startAddProblem,
      saveData,
      setFieldsForEdit,
      closeForm
    }
  }
}

// Common Functions

function edit (batchDataView, state, e, problem) {
  state.problem = problem

  state.fromProblem = problem

  state.showAddLabel = false
  state.showForm = true
  state.buttonLabel = 'Update'

  batchDataView.currentState = batchDataView.edittingDataState
}

// State Functions

const emptyState = () => {
  function startAddProblem (batchDataView, state) {
    // alert('In startAddFirstOutput!')
    state.showAddLabel = false
    state.showForm = true
    state.buttonLabel = 'Save'
    state.disableField = false

    batchDataView.currentState = batchDataView.addingDataState
  }

  return { startAddProblem }
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
    const newProblem = state.problem
    state.batch.problems.push(newProblem)

    state.showForm = false
    state.showAddLabel = true
    state.addLabel = 'Add more problems'

    batchDataView.currentState = batchDataView.hasDataState

    state.problem = ''
  }

  const setFieldsForEdit = (batchDataView, state, e, problem) => {
    edit(batchDataView, state, e, problem)
  }

  return { closeForm, saveData, setFieldsForEdit }
}

const hasDataState = () => {
  const setFieldsForEdit = (batchDataView, state, e, problem) => {
    edit(batchDataView, state, e, problem)
  }

  const startAddProblem = (batchDataView, state) => {
    // alert('In startAddFirstOutput!')
    state.showAddLabel = false
    state.showForm = true
    state.buttonLabel = 'Save'
    batchDataView.currentState = batchDataView.addingDataState
  }

  return { setFieldsForEdit, startAddProblem }
}

const edittingDataState = () => {
  const saveData = (batchDataView, state) => {
    // eslint-disable-next-line no-unused-vars
    let savedProblem = state.batch.problems.find((problem) => problem === state.fromProblem)
    const index = state.batch.problems.indexOf(state.fromProblem)

    savedProblem = state.problem
    state.batch.problems.splice(index, 1, state.problem)

    state.showForm = false
    state.showAddLabel = true

    state.problem = ''

    batchDataView.currentState = batchDataView.hasDataState
  }

  const closeForm = (batchDataView, state) => {
    state.showEditBatchFormFields = false

    batchDataView.currentState = batchDataView.hasDataState
  }

  const setFieldsForEdit = (batchDataView, state, e, problem) => {
    edit(batchDataView, state, e, problem)
  }

  return { saveData, setFieldsForEdit, closeForm }
}

class BatchDataViewManager {
  constructor (state) {
    this.emptyState = emptyState
    this.addingDataState = addingDataState
    this.hasDataState = hasDataState
    this.edittingDataState = edittingDataState

    if (state.batch.id != null) {
      state.showForm = false
      state.showAddLabel = true
      state.addLabel = 'Add more output'

      this.currentState = this.hasDataState
    } else {
      this.currentState = this.emptyState
    }

    this.state = state
  }

  startAddProblem () {
    const { startAddProblem } = this.currentState()
    startAddProblem(this, this.state)
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

  setFieldsForEdit (e, problem) {
    const { setFieldsForEdit } = this.currentState()
    setFieldsForEdit(this, this.state, e, problem)
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
