<template>
  <div id="field-profile-form" class="d-flex flex-column">
    <input-sync-state
      :name="'ncores'"
      :stateValue="stateNCores"
      v-on:input-sync-state-ok-clicked="setNumCores"
    >
    </input-sync-state>
    <div class="form-group mb-0">
      <input type="radio" name="radio-input-scan-option" 
        id="radio-input-scan-option"
        value='b0'
        v-model="scanOption"
      >
      <label for="radio-input-scan-option" class="col-form-label mr-2">
        Magnetic Field
      </label>
      <input type="radio" name="radio-input-scan-option" 
        id="radio-input-scan-option"
        value='emr'
        v-model="scanOption"
      >
      <label for="radio-input-scan-option" class="col-form-label">
        Gyrotron Frequency
      </label>
    </div>
    <div v-if="['b0','emr'].includes(scanOption)"
      class="card"
    >
      <div class="card-body">
        <div v-if="scanOption==='b0'"
          class="card-title"
        >
          Field Range (T)
        </div>
        <div v-if="scanOption==='emr'"
          class="card-title"
        >
          Emr Range (GHz)
        </div>
        <div v-if="editRange" class="d-flex flex-column">
          <div class="input-group">
            <span class="input-group-text col-2">Begin: </span>
            <input type="number" step="any"
              v-model="range.begin"
            >
          </div>
          <div class="input-group">
            <span class="input-group-text col-2">End: </span>
            <input type="number" step="any"
              v-model="range.end"
            >
          </div>
          <div class="input-group">
            <span class="input-group-text col-2">Step: </span>
            <input type="number" step="any"
              v-model="range.step"
            >
          </div>
          <div class="d-flex flex-row">
            <div class="btn btn-light btn-sm" @click="editRangeOkClicked">
              <i class="fas fa-check text-success"></i>
              <span>OK</span>    
            </div>
            <div class="btn btn-light btn-sm" @click="editRangeCancelClicked">
              <i class="fas fa-ban text-danger"></i>
              <span>Cancel</span>    
            </div>
          </div>
        </div>
        <div v-else class="d-flex flex-row"
          @click="editRangeClicked"
        >
          <div class="p mr-2">
            <span>Begin: </span>
            <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
              {{stateRange.begin}}
            </span>
          </div>
          <div class="p mr-2">
            <span>End: </span>
            <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
              {{stateRange.end}}
            </span>
          </div>
          <div>
            <span>Step: </span>
            <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
              {{stateRange.step}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import InputSyncState from '../../common/InputSyncState'

export default {
  name: 'field-profile-form',
  components: {
    InputSyncState
  },
  data () {
    return {
      ncores: 1,
      scanOption: 'b0',
      range: {
        begin: 0.0,
        end: 0.0,
        step: 1.0
      },
      editRange: false
    }
  },
  computed: {
    ...mapState('SimSettings', ['taskOptions']),
    ...mapState('SimSettings', {
      stateNCores: state => state.simulation.ncores
    }),
    stateRange: function () {
      return this.getFieldProfileRange()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let stateRange = this.getFieldProfileRange()
      this.range.begin = stateRange.begin
      this.range.end = stateRange.end
      this.range.step = stateRange.end
      this.scanOption = this.getFieldProfileScanOption()
      this.ncores = this.getNumCores()
    },
    ...mapActions('SimSettings', [
      'setNumCores',
      'setEmrRange', 'setFieldRange'
    ]),
    ...mapGetters('SimSettings', [
      'getFieldProfileScanOption', 'getNumCores',
      'getFieldProfileRange'
    ]),
    editRangeClicked () {
      let range = this.getFieldProfileRange()
      this.range.begin = parseFloat(range.begin)
      this.range.end = parseFloat(range.end)
      this.range.step = parseFloat(range.step)
      this.editRange = true
    },
    editRangeOkClicked () {
      this.editRange = false
      if (this.scanOption === 'b0') {
        this.setFieldRange(Object.assign({}, this.range))
      } else {
        this.setEmrRange(Object.assign({}, this.range))
      }
    },
    editRangeCancelClicked () {
      this.editRange = false
    }
  }
}
</script>

<style scoped>

</style>
