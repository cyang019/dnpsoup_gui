<template>
  <div class="card">
    <div v-if="editScan || (stateScanType.length === 0)" class="card-body d-flex flex-column">
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
      <div v-else
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
            <span class="mr-1">Range</span>
            <span v-if="rangeUnit.length > 0">({{rangeUnit}})</span>
          </div>
          <div class="d-flex flex-column">
            <div class="input-group">
              <div class="input-group-text">
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
              <div class="input-group-text">
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
              <div class="input-group-text">
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
    <div v-else class="card-body" @click="editScanClicked"
      data-toggle="tooltip" data-placement="top" title="Click to edit"
      @mouseover="hoverScanContent=true"
      @mouseleave="hoverScanContent=false"
      :class="{ 'bg-light': hoverScanContent }"
    >
      <div class="d-flex flex-row justify-content-between">
        <div class="card-title bg-light">
          <span>scan type: </span>
          <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
            {{stateScanType}}
          </span>
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row my-1">
          <span v-if="stateScanType === 'EmrLength'">
            section name:
          </span>
          <span v-else>
            emr name:
          </span>
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
        <div class="border border-light rounded p-2">
          <div class="p mt-2 mb-1 bg-light">
            <span class="mr-1">Range</span>
            <span v-if="stateRangeUnit.length > 0">({{stateRangeUnit}})</span>
          </div>
          <div class="p">
            <span class="mr-1">Begin: </span>
            <span class="mr-2 px-2 border-bottom border-bottom-light">{{rangeShown.begin}}</span>
            <span class="mr-1">End: </span>
            <span class="mr-2 px-2 border-bottom border-bottom-light">{{rangeShown.end}}</span>
            <span class="mr-1">Step: </span>
            <span class="px-2 border-bottom border-bottom-light">{{rangeShown.step}}</span>
          </div>
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
    },
    rangeUnit: function () {
      if (this.scanType === 'GammaB1') {
        return 'MHz'
      } else if (this.scanType === 'EmrPhase') {
        return 'Degree'
      } else {
        return ''
      }
    },
    stateRangeUnit: function () {
      if (this.stateScanType === 'GammaB1') {
        return 'MHz'
      } else if (this.stateScanType === 'EmrPhase') {
        return 'Degree'
      } else {
        return ''
      }
    },
    rangeShown: function () {
      if (this.stateScanType === 'GammaB1') {
        const newRange = {
          begin: this.stateScanRange.begin / 1.0e6,
          end: this.stateScanRange.end / 1.0e6,
          step: this.stateScanRange.step / 1.0e6
        }
        return newRange
      } else {
        return this.stateScanRange
      }
    }
  },
  methods: {
    ...mapGetters('pulseseq', [
      'getEmrByName', 'getSectionByName'
    ]),
    // during editing
    scanTypeChanged () {
      this.name = ''
      this.spin = ''
      this.resetRange()
    },
    nameChanged () {
      if (this.scanType === 'EmrLength') {
        this.tempChannels = []
      } else {
        let emrGetter = this.getEmrByName()
        let tempEmr = emrGetter(this.name)
        this.tempChannels = Object.assign([], tempEmr.channels)
      }
      this.resetRange()
    },
    updateRangeBegin () {
      if (this.scanType === 'EmrLength') {
        this.$emit('scan1d-set-scan-range-begin', parseInt(parseFloat(this.range.begin)))
      } else if (this.scanType === 'GammaB1') {
        this.$emit('scan1d-set-scan-range-begin', parseFloat(this.range.begin) * 1.0e6)
      } else {
        this.$emit('scan1d-set-scan-range-begin', parseFloat(this.range.begin))
      }
    },
    updateRangeEnd () {
      if (this.scanType === 'EmrLength') {
        this.$emit('scan1d-set-scan-range-end', parseInt(parseFloat(this.range.end)))
      } else if (this.scanType === 'GammaB1') {
        this.$emit('scan1d-set-scan-range-end', parseFloat(this.range.end) * 1.0e6)
      } else {
        this.$emit('scan1d-set-scan-range-end', parseFloat(this.range.end))
      }
    },
    updateRangeStep () {
      if (this.scanType === 'EmrLength') {
        this.$emit('scan1d-set-scan-range-step', parseInt(parseFloat(this.range.step)))
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
      this.getStateValues()
      this.editScan = true
    },
    editScanOkClicked () {
      this.editScan = false
      this.setStateValues()
      this.resetTempValues()
    },
    editScanCancelClicked () {
      this.editScan = false
      this.resetTempValues()
    },
    getStateValues () {
      this.scanType = this.stateScanType
      this.name = this.stateScanName
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
    },
    resetTempValues () {
      this.scanType = ''
      this.name = ''
      this.spin = ''
      this.resetRange()
    }
  },
  data () {
    return {
      editRange: false,

      scanType: '',
      spin: '',
      name: '',
      range: {
        begin: 0,
        end: 0,
        step: 1
      },
      editScan: false,
      hoverScanContent: false,

      tempChannels: []
    }
  }
}
</script>

<style scoped>

</style>
