<template>
  <div id="scan1d-form" class="d-flex flex-column">
    <div class="form-group mb-0">
      <label for="input-ncores" class="col-form-label">
        <span>ncores:</span>
      </label>
      <input type="number" step="1" min="1"
        v-model="ncores"
        @change="setNumCores(ncores)"
      >
    </div>
    <div class="form-group mb-0">
      <label for="select-scan-type" 
        class="col-form-label"
      >
        scan type:
      </label>
      <select name="select-scan-type" id="select-scan-type"
        v-model="scanType"
        @change="setScanType(scanType)"
      >
        <option v-for="stype in scanTypes"
          :key="stype"
          :value="stype"
        >
          {{stype}}
        </option>
      </select>
    </div>
    <div
      class="d-flex flex-column"
    >
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
          @change="captureSection"
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
          @change="captureEmr"
        >
          <option v-for="emr in emrs"
            :key="emr.name"
            :value="emr.name"
          >
            {{emr.name}}
          </option>
        </select>
      </div>
      <div v-if="scanType === 'GammaB1'"
        class="form-group mb-0"
      >
        <label for="select-scan-spin" class="col-form-label">
          spin
        </label>
        <select 
          name="select-scan-spin" 
          id="select-scan-spin"
          v-model="spin"
          @change="setScanSpin(spin)"
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
            <div class="form-group mb-0">
              <label v-if="scanType==='GammaB1'"
                for="input-scan1d-range-begin"
                class="col-form-label"
              >
                Begin (Hz)
              </label>
              <label v-if="scanType==='EmrPhase'"
                for="input-scan1d-range-begin"
                class="col-form-label"
              >
                Begin (Degree)
              </label>
              <label v-if="scanType==='EmrLength'"
                for="input-scan1d-range-begin"
                class="col-form-label"
              >
                Begin
              </label>
              <input v-if="scanType === 'EmrLength'" 
                type="number" step="1" min="0"
                name="input-scan1d-range-begin" 
                id="input-scan1d-range-begin"
                v-model="range.begin"
                @change="updateRangeBegin"
              >
              <input v-else 
                type="number" step="any"
                name="input-scan1d-range-begin"
                id="input-scan1d-range-begin"
                v-model="range.begin"
                @change="updateRangeBegin"
              >
            </div>
            <div class="form-group mb-0">
              <label v-if="scanType === 'GammaB1'"
                for="input-scan1d-range-end"
                class="col-form-label"
              >
                End (Hz)
              </label>
              <label v-if="scanType === 'EmrPhase'"
                for="input-scan1d-range-end"
                class="col-form-label"
              >
                End (Degree)
              </label>
              <label v-if="scanType === 'EmrLength'"
                for="input-scan1d-range-end"
                class="col-form-label"
              >
                End
              </label>
              <input v-if="scanType === 'EmrLength'" 
                type="number" step="1" min="0"
                name="input-scan1d-range-end"
                id="input-scan1d-range-end"
                v-model="range.end"
                @change="updateRangeEnd"
              >
              <input v-else 
                type="number" step="any"
                name="input-scan1d-range-end"
                id="input-scan1d-range-end"
                v-model="range.end"
                @change="updateRangeEnd"
              >
            </div>
            <small v-if="rangeStepError.length > 0" 
              class="text-danger">
              {{rangeStepError}}
            </small>
            <div class="form-group mb-0">
              <label v-if="scanType === 'GammaB1'"
                for="input-scan1d-range-step"
                class="col-form-label"
              >
                Step (Hz)
              </label>
              <label v-if="scanType === 'EmrPhase'"
                for="input-scan1d-range-step"
                class="col-form-label"
              >
                Step (Degree)
              </label>
              <label v-if="scanType === 'EmrLength'"
                for="input-scan1d-range-step"
                class="col-form-label"
              >
                Step
              </label>
              <input v-if="scanType === 'EmrLength'" 
                type="number" step="1" min="0"
                name="input-scan1d-range-step" 
                id="input-scan1d-range-step"
                v-model="range.step"
                @change="updateRangeStep"
              >
              <input v-else 
                type="number" step="any"
                name="input-scan1d-range-step"
                id="input-scan1d-range-step"
                v-model="range.step"
                @change="updateRangeStep"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'scan1d-form',
  computed: {
    ...mapState('SimSettings', {
      'scanTypes': state => state.simulation.task.taskDetails.scanTypes
    }),
    ...mapState('pulseseq', [
      'sections', 'emrs'
    ])
  },
  methods: {
    ...mapGetters('pulseseq', [
      'getEmrByName', 'getSectionByName'
    ]),
    ...mapActions('SimSettings', [
      'setNumCores',
      'setScanType', 'setScanName', 'setScanSpin',
      'setScanRangeBegin', 'setScanRangeEnd', 'setScanRangeStep'
    ]),
    captureSection () {
      this.tempChannels = []
      this.setScanName(this.name)
      this.resetRange()
    },
    captureEmr () {
      let emrGetter = this.getEmrByName()
      let tempEmr = emrGetter(this.name)
      this.tempChannels = Object.assign([], tempEmr.channels)
      this.setScanName(this.name)
      this.resetRange()
    },
    updateRangeBegin () {
      if (this.scanType === 'EmrLength') {
        this.setScanRangeBegin(parseInt(this.range.begin))
      } else {
        this.setScanRangeBegin(parseFloat(this.range.begin))
      }
    },
    updateRangeEnd () {
      if (this.scanType === 'EmrLength') {
        this.setScanRangeEnd(parseInt(this.range.end))
      } else {
        this.setScanRangeEnd(parseFloat(this.range.end))
      }
    },
    updateRangeStep () {
      this.rangeStepError = ''
      let val = parseFloat(this.range.step)
      if (val < 1.0e-14 && val > -1.0e-14) {
        this.rangeStepError = 'Step cannot be zero.'
        return
      }

      if (this.scanType === 'EmrLength') {
        this.setScanRangeStep(parseInt(this.range.step))
      } else {
        this.setScanRangeStep(parseFloat(this.range.step))
      }
    },
    resetRange () {
      this.range = {
        begin: 0,
        end: 0,
        step: 0
      }
    }
  },
  data () {
    return {
      rangeBeginError: '',
      rangeEndError: '',
      rangeStepError: '',

      ncores: 1,
      scanType: '',
      type: '',
      spin: '',
      name: '',
      range: {
        begin: 0,
        end: 0,
        step: 1
      },

      tempChannels: []
    }
  }
}
</script>

<style scoped>

</style>
