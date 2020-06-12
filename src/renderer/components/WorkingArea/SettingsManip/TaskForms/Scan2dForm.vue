<template>
  <div id="scan2d-form" class="d-flex flex-column">
    <input-sync-state
      :name="'ncores'"
      :stateValue="stateNCores"
      v-on:input-sync-state-ok-clicked="setNumCores"
    />
    <div class="d-flex flex-row" id="scan2d-form-dims">
      <div id="scan2d-form-dim1" class="card col-md-6">
        <div class="card-body">
          <div class="card-title">
            Dimension1
          </div>
          <scan1d-form-content
            :stateScanType="stateScanType1"
            :stateScanSpin="stateScanSpin1"
            :stateScanName="stateScanName1"
            :stateScanRange="stateScanRange1"
            v-on:scan1d-set-scan-type="setScanType1"
            v-on:scan1d-set-scan-name="setScanName1"
            v-on:scan1d-set-scan-spin="setScanSpin1"
            v-on:scan1d-set-scan-range-begin="setScanRange1Begin"
            v-on:scan1d-set-scan-range-end="setScanRange1End"
            v-on:scan1d-set-scan-range-step="setScanRange1Step"
          />
        </div>
      </div>
      <div id="scan2d-form-dim2" class="card col-md-6">
        <div class="card-body">
          <div class="card-title">
            Dimension2
          </div>
          <scan1d-form-content
            :stateScanType="stateScanType2"
            :stateScanSpin="stateScanSpin2"
            :stateScanName="stateScanName2"
            :stateScanRange="stateScanRange2"
            v-on:scan1d-set-scan-type="setScanType2"
            v-on:scan1d-set-scan-name="setScanName2"
            v-on:scan1d-set-scan-spin="setScanSpin2"
            v-on:scan1d-set-scan-range-begin="setScanRange2Begin"
            v-on:scan1d-set-scan-range-end="setScanRange2End"
            v-on:scan1d-set-scan-range-step="setScanRange2Step"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import InputSyncState from '../../common/InputSyncState'
import Scan1dFormContent from './Scan1dFormContent'

export default {
  name: 'scan2d-form',
  components: {
    InputSyncState,
    Scan1dFormContent
  },
  computed: {
    ...mapState('SimSettings', {
      scanTypes: state => state.simulation.task.taskDetails.scanTypes,
      stateNCores: state => state.simulation.ncores,

      stateScanType1: state => state.simulation.task.taskDetails.type1,
      stateScanSpin1: state => state.simulation.task.taskDetails.spin1,
      stateScanName1: state => state.simulation.task.taskDetails.name1,
      stateScanRange1: state => state.simulation.task.taskDetails.range1,
      stateScanType2: state => state.simulation.task.taskDetails.type2,
      stateScanSpin2: state => state.simulation.task.taskDetails.spin2,
      stateScanName2: state => state.simulation.task.taskDetails.name2,
      stateScanRange2: state => state.simulation.task.taskDetails.range2
    })
  },
  methods: {
    ...mapGetters('pulseseq', [
      'getEmrByName', 'getSectionByName'
    ]),
    ...mapActions('SimSettings', [
      'setNumCores',
      'setScanType1', 'setScanName1', 'setScanSpin1',
      'setScanRange1Begin', 'setScanRange1End', 'setScanRange1Step',
      'setScanType2', 'setScanName2', 'setScanSpin2',
      'setScanRange2Begin', 'setScanRange2End', 'setScanRange2Step'
    ])
  }
}
</script>

<style scoped>

</style>
