function edit (batchDataView, state) {
  state.showEditBatchFormFields = true

  state.startTime = state.batch.startTime
  state.flourQuantity = state.batch.flourQuantity

  batchDataView.currentState = batchDataView.editState
}

// State Functions

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

  const startEdit = (batchDataView, state) => {
    edit(batchDataView, state)
  }

  return { updateHeader, startEdit }
}

class BatchDataViewManager {
  constructor (state) {
    this.emptyState = emptyState
    this.addDataState = addDataState
    this.hasDataState = hasDataState
    this.editState = editState

    this.currentState = this.emptyState
    this.state = state
  }

  setHeaderInfoClicked () {
    const { setHeaderInfoClicked } = this.currentState()
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
