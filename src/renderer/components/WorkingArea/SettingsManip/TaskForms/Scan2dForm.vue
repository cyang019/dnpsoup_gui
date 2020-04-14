<template>
  <div id="scan2d-form" class="d-flex flex-column">
    <div class="form-group mb-0">
      <label for="input-ncores" class="col-form-label">
        <span>ncores:</span>
      </label>
      <input type="number" step="1" min="1"
        v-model="ncores"
        @change="setNumCores(ncores)"
      >
    </div>
    <div class="d-flex flex-row" id="scan2d-form-dims">
      <div id="scan2d-form-dim1" class="card col-md-6">
        <div class="card-body">
          <div class="card-title">
            Dimension1
          </div>
          <div class="d-flex flex-column">
            <div class="form-group mb-0">
              <label for="select-scan-type1" 
                class="col-form-label"
              >
                scan type:
              </label>
              <select name="select-scan-type1" id="select-scan-type1"
                v-model="scanType1"
                @change="setScanType1(scanType1)"
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
              <div v-if="scanType1 === 'EmrLength'"
                class="form-group mb-0"
              >
                <label for="select-scan-name1" class="col-form-label">
                  section name
                </label>
                <select
                  name="select-scan-name1"
                  id="select-scan-name1"
                  v-model="name1"
                  @change="captureSection1"
                >
                  <option v-for="section in sections"
                    :key="section.name"
                    :value="section.name"
                  >
                    {{section.name}}
                  </option>
                </select>
              </div>
              <div v-if="['GammaB1', 'EmrPhase'].includes(scanType1)" 
                class="form-group mb-0"
              >
                <label for="select-scan-name1" class="col-form-label">
                  emr name
                </label>
                <select 
                  name="select-scan-name1" 
                  id="select-scan-name1"
                  v-model="name1"
                  @change="captureEmr1"
                >
                  <option v-for="emr in emrs"
                    :key="emr.name"
                    :value="emr.name"
                  >
                    {{emr.name}}
                  </option>
                </select>
              </div>
              <div v-if="scanType1 === 'GammaB1'"
                class="form-group mb-0"
              >
                <label for="select-scan-spin1" class="col-form-label">
                  spin
                </label>
                <select 
                  name="select-scan-spin1"
                  id="select-scan-spin1"
                  v-model="spin1"
                  @change="setScanSpin1(spin1)"
                >
                  <option 
                    v-for="c in tempChannels1"
                    :key="c.spinType"
                    :value="c.spinType"
                  >
                    {{c.spinType}}
                  </option>
                </select>
              </div>
              <div v-if="scanType1 !== ''" class="card">
                <div class="card-body">
                  <div class="card-title">
                    Range
                  </div>
                  <div class="d-flex flex-column">
                    <div class="form-group mb-0">
                      <label v-if="scanType1 === 'GammaB1'"
                        for="input-scan2d-range1-begin"
                        class="col-form-label"
                      >
                        Begin (Hz)
                      </label>
                      <label v-if="scanType1 === 'EmrPhase'"
                        for="input-scan2d-range1-begin"
                        class="col-form-label"
                      >
                        Begin (Degree)
                      </label>
                      <label v-if="scanType1 === 'EmrLength'"
                        for="input-scan2d-range1-begin"
                        class="col-form-label"
                      >
                        Begin
                      </label>
                      <input v-if="scanType1 === 'EmrLength'" 
                        type="number" step="1" min="0"
                        name="input-scan2d-range1-begin" 
                        id="input-scan2d-range1-begin"
                        v-model="range1.begin"
                        @change="updateRange1Begin"
                      >
                      <input v-else 
                        type="number" step="any"
                        name="input-scan2d-range1-begin"
                        id="input-scan2d-range1-begin"
                        v-model="range1.begin"
                        @change="updateRange1Begin"
                      >
                    </div>
                    <div class="form-group mb-0">
                      <label v-if="scanType1 === 'GammaB1'"
                        for="input-scan2d-range1-end"
                        class="col-form-label"
                      >
                        End (Hz)
                      </label>
                      <label v-if="scanType1 === 'EmrPhase'"
                        for="input-scan2d-range1-end"
                        class="col-form-label"
                      >
                        End (Degree)
                      </label>
                      <label v-if="scanType1 === 'EmrLength'"
                        for="input-scan2d-range1-end"
                        class="col-form-label"
                      >
                        End
                      </label>
                      <input v-if="scanType1 === 'EmrLength'" 
                        type="number" step="1" min="0"
                        name="input-scan2d-range1-end"
                        id="input-scan2d-range1-end"
                        v-model="range1.end"
                        @change="updateRange1End"
                      >
                      <input v-else 
                        type="number" step="any"
                        name="input-scan2d-range1-end"
                        id="input-scan2d-range1-end"
                        v-model="range1.end"
                        @change="updateRange1End"
                      >
                    </div>
                    <small v-if="range1StepError.length > 0" 
                      class="text-danger">
                      {{range1StepError}}
                    </small>
                    <div class="form-group mb-0">
                      <label v-if="scanType1 === 'GammaB1'"
                        for="input-scan2d-range1-step"
                        class="col-form-label"
                      >
                        Step (Hz)
                      </label>
                      <label v-if="scanType1 === 'EmrPhase'"
                        for="input-scan2d-range1-step"
                        class="col-form-label"
                      >
                        Step (Degree)
                      </label>
                      <label v-if="scanType1 === 'EmrLength'"
                        for="input-scan2d-range1-step"
                        class="col-form-label"
                      >
                        Step
                      </label>
                      <input v-if="scanType1 === 'EmrLength'" 
                        type="number" step="1" min="0"
                        name="input-scan2d-range1-step" 
                        id="input-scan2d-range1-step"
                        v-model="range1.step"
                        @change="updateRange1Step"
                      >
                      <input v-else 
                        type="number" step="any"
                        name="input-scan2d-range1-step"
                        id="input-scan2d-range1-step"
                        v-model="range1.step"
                        @change="updateRange1Step"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="scan2d-form-dim2" class="card col-md-6">
        <div class="card-body">
          <div class="card-title">
            Dimension2
          </div>
          <div class="d-flex flex-column">
            <div class="form-group mb-0">
              <label for="select-scan-type2" 
                class="col-form-label"
              >
                scan type:
              </label>
              <select name="select-scan-type2" id="select-scan-type2"
                v-model="scanType2"
                @change="setScanType2(scanType2)"
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
              <div v-if="scanType2 === 'EmrLength'"
                class="form-group mb-0"
              >
                <label for="select-scan-name2" class="col-form-label">
                  section name
                </label>
                <select
                  name="select-scan-name2"
                  id="select-scan-name2"
                  v-model="name2"
                  @change="captureSection2"
                >
                  <option v-for="section in sections"
                    :key="section.name"
                    :value="section.name"
                  >
                    {{section.name}}
                  </option>
                </select>
              </div>
              <div v-if="['GammaB1', 'EmrPhase'].includes(scanType2)" 
                class="form-group mb-0"
              >
                <label for="select-scan-name2" class="col-form-label">
                  emr name
                </label>
                <select 
                  name="select-scan-name" 
                  id="select-scan-name"
                  v-model="name2"
                  @change="captureEmr2"
                >
                  <option v-for="emr in emrs"
                    :key="emr.name"
                    :value="emr.name"
                  >
                    {{emr.name}}
                  </option>
                </select>
              </div>
              <div v-if="scanType2 === 'GammaB1'"
                class="form-group mb-0"
              >
                <label for="select-scan-spin2" class="col-form-label">
                  spin
                </label>
                <select 
                  name="select-scan-spin2" 
                  id="select-scan-spin2"
                  v-model="spin2"
                  @change="setScanSpin2(spin2)"
                >
                  <option 
                    v-for="c in tempChannels2"
                    :key="c.spinType"
                    :value="c.spinType"
                  >
                    {{c.spinType}}
                  </option>
                </select>
              </div>
              <div v-if="scanType2 !== ''" class="card">
                <div class="card-body">
                  <div class="card-title">
                    Range
                  </div>
                  <div class="d-flex flex-column">
                    <div class="form-group mb-0">
                      <label v-if="scanType2 === 'GammaB1'"
                        for="input-scan2d-range2-begin"
                        class="col-form-label"
                      >
                        Begin (Hz)
                      </label>
                      <label v-if="scanType2 === 'EmrPhase'"
                        for="input-scan2d-range2-begin"
                        class="col-form-label"
                      >
                        Begin (Degree)
                      </label>
                      <label v-if="scanType2 === 'EmrLength'"
                        for="input-scan2d-range2-begin"
                        class="col-form-label"
                      >
                        Begin
                      </label>
                      <input v-if="scanType2 === 'EmrLength'" 
                        type="number" step="1" min="0"
                        name="input-scan2d-range2-begin" 
                        id="input-scan2d-range2-begin"
                        v-model="range2.begin"
                        @change="updateRange2Begin"
                      >
                      <input v-else 
                        type="number" step="any"
                        name="input-scan2d-range2-begin"
                        id="input-scan2d-range2-begin"
                        v-model="range2.begin"
                        @change="updateRange2Begin"
                      >
                    </div>
                    <div class="form-group mb-0">
                      <label v-if="scanType2 === 'GammaB1'"
                        for="input-scan2d-range2-end"
                        class="col-form-label"
                      >
                        End (Hz)
                      </label>
                      <label v-if="scanType2 === 'EmrPhase'"
                        for="input-scan2d-range2-end"
                        class="col-form-label"
                      >
                        End (Degree)
                      </label>
                      <label v-if="scanType2 === 'EmrLength'"
                        for="input-scan2d-range2-end"
                        class="col-form-label"
                      >
                        End
                      </label>
                      <input v-if="scanType2 === 'EmrLength'" 
                        type="number" step="1" min="0"
                        name="input-scan2d-range2-end"
                        id="input-scan2d-range2-end"
                        v-model="range2.end"
                        @change="updateRange2End"
                      >
                      <input v-else
                        type="number" step="any"
                        name="input-scan2d-range2-end"
                        id="input-scan2d-range2-end"
                        v-model="range2.end"
                        @change="updateRange2End"
                      >
                    </div>
                    <small v-if="range2StepError.length > 0" 
                      class="text-danger">
                      {{range2StepError}}
                    </small>
                    <div class="form-group mb-0">
                      <label v-if="scanType2 === 'GammaB1'"
                        for="input-scan2d-range2-step"
                        class="col-form-label"
                      >
                        Step (Hz)
                      </label>
                      <label v-if="scanType2 === 'EmrPhase'"
                        for="input-scan2d-range2-step"
                        class="col-form-label"
                      >
                        Step (Degree)
                      </label>
                      <label v-if="scanType2 === 'EmrLength'"
                        for="input-scan2d-range2-step"
                        class="col-form-label"
                      >
                        Step
                      </label>
                      <input v-if="scanType2 === 'EmrLength'" 
                        type="number" step="1" min="0"
                        name="input-scan2d-range2-step" 
                        id="input-scan2d-range2-step"
                        v-model="range2.step"
                        @change="updateRange2Step"
                      >
                      <input v-else 
                        type="number" step="any"
                        name="input-scan2d-range2-step"
                        id="input-scan2d-range2-step"
                        v-model="range2.step"
                        @change="updateRange2Step"
                      >
                    </div>
                  </div>
                </div>
              </div>
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
  name: 'scan2d-form',
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
      'setScanType1', 'setScanName1', 'setScanSpin1',
      'setScanRange1Begin', 'setScanRange1End', 'setScanRange1Step',
      'setScanType2', 'setScanName2', 'setScanSpin2',
      'setScanRange1Begin', 'setScanRange2End', 'setScanRange2Step'
    ]),
    captureSection1 () {
      this.tempChannels1 = []
      this.setScanName1(this.name1)
      this.resetRange1()
    },
    captureSection2 () {
      this.tempChannels2 = []
      this.setScanName2(this.name2)
      this.resetRange2()
    },
    captureEmr1 () {
      let emrGetter = this.getEmrByName()
      let tempEmr = emrGetter(this.name1)
      this.tempChannels1 = Object.assign([], tempEmr.channels)
      this.setScanName1(this.name1)
      this.resetRange1()
    },
    captureEmr2 () {
      let emrGetter = this.getEmrByName()
      let tempEmr = emrGetter(this.name2)
      this.tempChannels2 = Object.assign([], tempEmr.channels)
      this.setScanName2(this.name2)
      this.resetRange2()
    },
    updateRange1Begin () {
      if (this.scanType1 === 'EmrLength') {
        this.setScanRange1Begin(parseInt(this.range1.begin))
      } else {
        this.setScanRange1Begin(parseFloat(this.range1.begin))
      }
    },
    updateRange2Begin () {
      if (this.scanType2 === 'EmrLength') {
        this.setScanRange2Begin(parseInt(this.range2.begin))
      } else {
        this.setScanRange2Begin(parseFloat(this.range2.begin))
      }
    },
    updateRange1End () {
      if (this.scanType1 === 'EmrLength') {
        this.setScanRange1End(parseInt(this.range1.end))
      } else {
        this.setScanRange1End(parseFloat(this.range1.end))
      }
    },
    updateRange2End () {
      if (this.scanType2 === 'EmrLength') {
        this.setScanRange2End(parseInt(this.range2.end))
      } else {
        this.setScanRange2End(parseFloat(this.range2.end))
      }
    },
    updateRange1Step () {
      this.range1StepError = ''
      let val = parseFloat(this.range1.step)
      if (val < 1.0e-14 && val > -1.0e-14) {
        this.range1StepError = 'Step cannot be zero.'
        return
      }

      if (this.scanType1 === 'EmrLength') {
        this.setScanRange1Step(parseInt(this.range1.step))
      } else {
        this.setScanRange1Step(parseFloat(this.range1.step))
      }
    },
    updateRange2Step () {
      this.range2StepError = ''
      let val = parseFloat(this.range2.step)
      if (val < 1.0e-14 && val > -1.0e-14) {
        this.range2StepError = 'Step cannot be zero.'
        return
      }

      if (this.scanType2 === 'EmrLength') {
        this.setScanRange2Step(parseInt(this.range2.step))
      } else {
        this.setScanRange2Step(parseFloat(this.range2.step))
      }
    },
    resetRange1 () {
      this.range1 = {
        begin: 0,
        end: 0,
        step: 0
      }
    },
    resetRange2 () {
      this.range2 = {
        begin: 0,
        end: 0,
        step: 0
      }
    }
  },
  data () {
    return {
      range1BeginError: '',
      range1EndError: '',
      range1StepError: '',
      range2BeginError: '',
      range2EndError: '',
      range2StepError: '',

      ncores: 1,
      scanType1: '',
      type1: '',
      spin1: '',
      name1: '',
      range1: {
        begin: 0,
        end: 0,
        step: 1
      },
      scanType2: '',
      type2: '',
      spin2: '',
      name2: '',
      range2: {
        begin: 0,
        end: 0,
        step: 1
      },

      tempChannels1: [],
      tempChannels2: []
    }
  }
}
</script>

<style scoped>

</style>
