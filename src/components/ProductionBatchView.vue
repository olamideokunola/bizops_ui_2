<template>

    <div>
      <ProductionBatchHeader
        :batch="state.batch"
        ></ProductionBatchHeader>
      <ProductionBatchLabour
        :batch="state.batch"
        ></ProductionBatchLabour>
      <ProductionBatchOutput
        :batch="state.batch"
        :producttype="state.producttype"
        ></ProductionBatchOutput>
      <ProductionBatchProblems
        :batch="state.batch"
        ></ProductionBatchProblems>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { reactive, computed } from '@vue/composition-api'

import ProductionBatchHeader from '../components/ProductionBatchHeader'
import ProductionBatchLabour from '../components/ProductionBatchLabour'
import ProductionBatchOutput from '../components/ProductionBatchOutput'
import ProductionBatchProblems from '../components/ProductionBatchProblems'

export default {
  props: {
    outerbatch: {
      type: Object,
      required: true
    },
    outerbatchnumber: {
      type: Number,
      required: false
    },
    outerproducttype: {
      type: String,
      required: false
    }
  },
  components: {
    ProductionBatchHeader,
    ProductionBatchLabour,
    ProductionBatchOutput,
    ProductionBatchProblems
  },
  setup (props, { root: { $store, $router, $route } }) {
    const state = reactive({
      store: $store,
      showSetBatchLabel: true,
      showNewBatchFormFields: false,
      batch: computed(() => props.outerbatch),
      producttype: computed(() => props.outerproducttype),
      showBatchInfo: false,
      showEditBatchFormFields: false
    })

    return {
      state
    }
  },
  computed: {
    ...mapGetters([
      'productNames',
      'productNamesFromProductType'
    ]),
    ...mapState([
      'dayProduction'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
.row-bkg {
  background-color: rgba(189,164,114,0.4);
  border-radius: 5px;
}
</style>
