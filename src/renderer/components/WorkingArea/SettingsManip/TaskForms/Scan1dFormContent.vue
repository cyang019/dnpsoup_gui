<template>
  <div>
    <div v-if="editScan" class="d-flex flex-column">
      <div class="d-flex flex-row">
        <label for="select-scan-type" 
          class="col-form-label"
        >
          scan type:
        </label>
        <select name="select-scan-type" id="select-scan-type"
          v-model="scanType"
          @change="scanTypeChanged"
        >
          <option v-for="stype in scanTypes"
            :key="stype"
            :value="stype"
          >
            {{stype}}
          </option>
        </select>
      </div>
      <div v-if="scanType === 'EmrLength'"
        class="form-group mb-0"
      >
        <label for="select-scan-name" class="col-form-label">
          section name
        </label>
        <select
          name="select-scan-name"
          id="select-scan-name"
          v-model="name"
          @change="nameChanged"
        >
          <option v-for="section in sections"
            :key="section.name"
            :value="section.name"
          >
            {{section.name}}
          </option>
        </select>
      </div>
      <div v-if="['GammaB1', 'EmrPhase'].includes(scanType)" 
        class="form-group mb-0"
      >
        <label for="select-scan-name" class="col-form-label">
          emr name
        </label>
        <select 
          name="select-scan-name" 
          id="select-scan-name"
          v-model="name"
          @change="nameChanged"
        >
          <option v-for="emr in emrs"
            :key="emr.name"
            :value="emr.name"
          >
            {{emr.name}}
          </option>
        </select>
        <label for="select-scan-spin" class="col-form-label">
          spin
        </label>
        <select 
          name="select-scan-spin" 
          id="select-scan-spin"
          v-model="spin"
        >
          <option 
            v-for="c in tempChannels"
            :key="c.spinType"
            :value="c.spinType"
          >
            {{c.spinType}}
          </option>
        </select>
      </div>
      <div v-if="scanType !== ''" class="card">
        <div class="card-body">
          <div class="card-title">
            Range
          </div>
          <div class="d-flex flex-column">
            <div class="input-group">
              <div class="input-group-text" v-if="scanType==='GammaB1'">
                Begin (MHz)
              </div>
              <div class="input-group-text" v-if="scanType==='EmrPhase'">
                Begin (Degree)
              </div>
              <div class="input-group-text" v-if="scanType==='EmrLength'">
                Begin
              </div>
              <input v-if="scanType === 'EmrLength'" 
                type="number" step="1" min="0"
                v-model="range.begin"
              >
              <input v-else 
                type="number" step="any"
                v-model="range.begin"
              >
            </div>
            <div class="input-group">
              <div class="input-group-text" v-if="scanType === 'GammaB1'">
                End (MHz)
              </div>
              <div class="input-group-text" v-if="scanType === 'EmrPhase'">
                End (Degree)
              </div>
              <div class="input-group-text" v-if="scanType === 'EmrLength'">
                End
              </div>
              <input v-if="scanType === 'EmrLength'" 
                type="number" step="1" min="0"
                name="input-scan1d-range-end"
                v-model="range.end"
              >
              <input v-else 
                type="number" step="any"
                name="input-scan1d-range-end"
                v-model="range.end"
              >
            </div>
            <small v-if="rangeStepError.length > 0" 
              class="text-danger">
              {{rangeStepError}}
            </small>
            <div class="input-group">
              <div class="input-group-text" v-if="scanType === 'GammaB1'">
                Step (MHz)
              </div>
              <div class="input-group-text" v-if="scanType === 'EmrPhase'">
                Step (Degree)
              </div>
              <div class="input-group-text" v-if="scanType === 'EmrLength'">
                Step
              </div>
              <input v-if="scanType === 'EmrLength'" 
                type="number" step="1" min="0"
                name="input-scan1d-range-step"
                v-model="range.step"
              >
              <input v-else 
                type="number" step="any"
                name="input-scan1d-range-step"
                v-model="range.step"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row">
        <div class="btn btn-light btn-sm" @click="editScanOkClicked">
          <i class="fas fa-check text-success"></i>
          <span>OK</span>    
        </div>
        <div class="btn btn-light btn-sm" @click="editScanCancelClicked">
          <i class="fas fa-ban text-danger"></i>
          <span>Cancel</span>    
        </div>
      </div>
    </div>
    <!-- otherwise show state values -->
    <div v-else @click="editScanClicked" class="d-flex flex-column">
      <div class="d-flex flex-row my-1">
        <span>scan type: </span>
        <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
          {{stateScanType}}
        </span>
      </div>
      <div v-if="stateScanType === 'EmrLength'" class="d-flex flex-row my-1">
        <span>section name: </span>
        <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
          {{stateScanName}}
        </span>
      </div>
      <div v-else-if="stateScanType === 'GammaB1'" class="d-flex flex-row my-1">
        <span>emr name: </span>
        <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
          {{stateScanName}}
        </span>
      </div>
      <div v-else class="d-flex flex-row my-1">
        <span>emr name: </span>
        <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
          {{stateScanName}}
        </span>
      </div>
      <div v-if="stateScanType === 'EmrPhase' || stateScanType === 'GammaB1'"
        class="d-flex flex-row my-1"
      >
        <span>spin: </span>
        <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
          {{stateScanSpin}}
        </span>
      </div>
      <div class="d-flex flex-column my-1">
        <div class="d-flex flex-row">
          <span>Begin</span>
          <span v-if="scanType === 'GammaB1'" class="mx-1">
            (MHz):
          </span>
          <span v-else-if="scanType === 'EmrPhase'" class="mx-1">
            (Degree):
          </span>
          <span v-if="stateScanType === 'GammaB1'"
            class="ml-1 mr-2 pl-2 pr-4 bg-light border-bottom border-bottom-secondary"
          >
            {{stateScanRange.begin / 1.0e6}}
          </span>
          <span v-else class="ml-1 mr-2 pl-2 pr-4 bg-light border-bottom border-bottom-secondary">
            {{stateScanRange.begin}}
          </span>
        </div>
        <div class="d-flex flex-row">
          <span>End</span>
          <span v-if="scanType === 'GammaB1'" class="mx-1">
            (MHz):
          </span>
          <span v-else-if="scanType === 'EmrPhase'" class="mx-1">
            (Degree):
          </span>
          <span v-if="stateScanType === 'GammaB1'"
            class="ml-1 mr-2 pl-2 pr-4 bg-light border-bottom border-bottom-secondary"
          >
            {{stateScanRange.end / 1.0e6}}
          </span>
          <span v-else class="ml-1 mr-2 pl-2 pr-4 bg-light border-bottom border-bottom-secondary">
            {{stateScanRange.end}}
          </span>
        </div>
        <div class="d-flex flex-row">
          <span>Step</span>
          <span v-if="scanType === 'GammaB1'" class="mx-1">
            (MHz):
          </span>
          <span v-else-if="scanType === 'EmrPhase'" class="mx-1">
            (Degree):
          </span>
          <span v-if="stateScanType === 'GammaB1'"
            class="ml-1 mr-2 pl-2 pr-4 bg-light border-bottom border-bottom-secondary"
          >
            {{stateScanRange.step / 1.0e6}}
          </span>
          <span v-else class="ml-1 mr-2 pl-2 pr-4 bg-light border-bottom border-bottom-secondary">
            {{stateScanRange.step}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import InputSyncState from '../../common/InputSyncState'

export default {
  name: 'scan1d-form-content',
  components: {
    InputSyncState
  },
  props: [
    'stateScanType', 'stateScanSpin', 'stateScanName', 'stateScanRange'
  ],
  computed: {
    ...mapState('SimSettings', {
      scanTypes: state => state.simulation.task.taskDetails.scanTypes
    }),
    ...mapState('pulseseq', [
      'sections', 'emrs'
    ]),
    rangeStepError: function () {
      let val = parseFloat(this.range.step)
      if (val < 1.0e-14 && val > -1.0e-14) {
        return 'Step cannot be zero.'
      } else {
        return ''
      }
    },
    rangeBeginError: function () {
      return ''
    },
    rangeEndError: function () {
      return ''
    }
  },
  methods: {
    ...mapGetters('pulseseq', [
      'getEmrByName', 'getSectionByName'
    ]),
    scanTypeChanged () {
      this.resetRange()
    },
    nameChanged () {
      if (this.scanType === 'EmrLength') {
        this.tempChannels = []
        this.resetRange()
      } else {
        let emrGetter = this.getEmrByName()
        let tempEmr = emrGetter(this.name)
        this.tempChannels = Object.assign([], tempEmr.channels)
      }
      this.resetRange()
    },
    updateRangeBegin () {
      if (this.scanType === 'EmrLength') {
        this.$emit('scan1d-set-scan-range-begin', parseInt(this.range.begin))
      } else if (this.scanType === 'GammaB1') {
        this.$emit('scan1d-set-scan-range-begin', parseFloat(this.range.begin) * 1.0e6)
      } else {
        this.$emit('scan1d-set-scan-range-begin', parseFloat(this.range.begin))
      }
    },
    updateRangeEnd () {
      if (this.scanType === 'EmrLength') {
        this.$emit('scan1d-set-scan-range-end', parseInt(this.range.end))
      } else if (this.scanType === 'GammaB1') {
        this.$emit('scan1d-set-scan-range-end', parseFloat(this.range.end) * 1.0e6)
      } else {
        this.$emit('scan1d-set-scan-range-end', parseFloat(this.range.end))
      }
    },
    updateRangeStep () {
      if (this.scanType === 'EmrLength') {
        this.$emit('scan1d-set-scan-range-step', parseInt(this.range.step))
      } else if (this.scanType === 'GammaB1') {
        this.$emit('scan1d-set-scan-range-step', parseFloat(this.range.step) * 1.0e6)
      } else {
        this.$emit('scan1d-set-scan-range-step', parseFloat(this.range.step))
      }
    },
    resetRange () {
      this.range = {
        begin: 0,
        end: 0,
        step: 1
      }
    },
    editScanClicked () {
      this.editScan = true
    },
    editScanOkClicked () {
      this.editScan = false
      this.setStateValues()
    },
    editScanCancelClicked () {
      this.editScan = false
    },
    getStateValues () {
      this.scanType = this.stateScanType
      this.type = this.stateScanName
      this.spin = this.stateScanSpin
      if (this.scanType === 'GammaB1') {
        this.range.begin = parseFloat(this.stateScanRange.begin) / 1.0e6
        this.range.end = parseFloat(this.stateScanRange.end) / 1.0e6
        this.range.step = parseFloat(this.stateScanRange.step) / 1.0e6
      } else {
        this.range.begin = parseFloat(this.stateScanRange.begin)
        this.range.end = parseFloat(this.stateScanRange.end)
        this.range.step = parseFloat(this.stateScanRange.step)
      }
    },
    setStateValues () {
      this.$emit('scan1d-set-scan-type', this.scanType)
      this.$emit('scan1d-set-scan-name', this.name)
      if (['EmrPhase', 'GammaB1'].includes(this.scanType)) {
        this.$emit('scan1d-set-scan-spin', this.spin)
      }
      this.updateRangeBegin()
      this.updateRangeEnd()
      this.updateRangeStep()
    }
  },
  data () {
    return {
      editRange: false,

      scanType: '',
      type: '',
      spin: '',
      name: '',
      range: {
        begin: 0,
        end: 0,
        step: 1
      },
      editScan: false,

      tempChannels: []
    }
  }
}
</script>

<style scoped>

</style>
