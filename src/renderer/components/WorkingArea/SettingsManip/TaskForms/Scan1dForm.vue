<template>
  <div id="scan1d-form" class="d-flex flex-column">
    <input-sync-state
      :name="'ncores'"
      :stateValue="stateNCores"
      v-on:input-sync-state-ok-clicked="setNumCores"
    />
    <scan1d-form-content
      :stateScanType="stateScanType"
      :stateScanSpin="stateScanSpin"
      :stateScanName="stateScanName"
      :stateScanRange="stateScanRange"
      v-on:scan1d-set-scan-type="setScanType"
      v-on:scan1d-set-scan-name="setScanName"
      v-on:scan1d-set-scan-spin="setScanSpin"
      v-on:scan1d-set-scan-range-begin="setScanRangeBegin"
      v-on:scan1d-set-scan-range-end="setScanRangeEnd"
      v-on:scan1d-set-scan-range-step="setScanRangeStep"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import InputSyncState from '../../common/InputSyncState'
import Scan1dFormContent from './Scan1dFormContent'

export default {
  name: 'scan1d-form',
  components: {
    InputSyncState,
    Scan1dFormContent
  },
  computed: {
    ...mapState('SimSettings', {
      stateNCores: state => state.simulation.ncores,
      stateScanType: state => state.simulation.task.taskDetails.type,
      stateScanSpin: state => state.simulation.task.taskDetails.spin,
      stateScanName: state => state.simulation.task.taskDetails.name,
      stateScanRange: state => state.simulation.task.taskDetails.range,
      scanTypes: state => state.simulation.task.taskDetails.scanTypes
    })
  },
  methods: {
    ...mapGetters('pulseseq', [
      'getEmrByName', 'getSectionByName'
    ]),
    ...mapActions('SimSettings', [
      'setNumCores',
      'setScanType', 'setScanName', 'setScanSpin',
      'setScanRangeBegin', 'setScanRangeEnd', 'setScanRangeStep'
    ])
  }
}
</script>

<style scoped>

</style>
