<template>
  <div class="card">
    <div class="card-header">
      <span>hardware settings</span>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column">
        <div class="d-flex flex-wrap">
          <button v-for="magnet in refMagnets" 
            :key="magnet.name"
            @click="setFieldFreq(magnet.field, magnet.freq)"
            class="badge badge-light mr-1 badge-default-btn"
          >
            {{magnet.name}}
          </button>
        </div>
        <div class="form-group mb-0">
          <label for="input-magnet-field" class="col-form-label">
            Magnetic Field:
          </label>
          <input type="number" step="any"
            id="input-magnet-field"
            class="col-md-3"
            v-model="magneticField"
            @change="setFieldState"
          >
          <label for="input-magnet-field" class="col-form-label">T</label>
        </div>
        <div class="form-group mb-0">
          <label for="input-gyrotron-frequency">
            Gyrotron Frequency
          </label>
          <input type="number" step="any"
            id="input-gyrotron-frequency"
            class="col-md-3"
            v-model="gyrotronFrequency"
            @change="setGyrotronFrequencyState"
          >
          <label for="input-gyrotron-frequency" class="col-form-label">GHz</label>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              Probe
            </div>
            <div class="d-flex flex-column">
              <div class="form-group mb-0">
                <label for="input-mas" class="col-form-label">
                  MAS frequency (Hz)
                </label>
                <input type="number" step="any" name="input-mas" id="input-mas"
                  v-model="masFrequency"
                  @change="setMasFrequencyState"
                >
              </div>
              <div class="form-group mb-0">
                <label for="input-increment" class="col-form-label">
                  Increment (ns)
                </label>
                <input type="number" step="any" id="input-increment" min="0"
                  v-model="increment"
                  @change="setIncrementState"
                >
              </div>
              <div class="form-group mb-0">
                <label for="input-temperature" class="col-form-label">
                  Temperature (K)
                </label>
                <input type="number" step="any" id="input-temperature" min="0"
                  v-model="temperature"
                  @change="setTemperatureState"
                >
              </div>
              <div class="form-group mb-0">
                <label for="input-acq" class="col-form-label">
                  Acquisition:
                </label>
                <select name="input-acq" id="input-acq"
                  v-model="acq"
                  @change="setAcqState"
                >
                  <option v-for="spinType in spinTypes" :key=spinType
                    :value="spinType"
                  >
                    {{spinType}}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'hardware-settings',
  computed: {
    ...mapState('SimSettings', {
      'refMagnets': state => state.refMagnets,
      'stateB0': state => state.hardware.magnet.b0,
      'stateGyrotronFrequency': state => state.hardware.gyrotron.emFrequency,
      'stateProbeMas': state => state.hardware.probe.masFrequency,
      'stateProbeTemperature': state => state.hardware.probe.temperature,
      'stateProbeMasIncrement': state => state.hardware.probe.masIncrement,
      'stateProbeAcq': state => state.hardware.probe.acq
    }),
    ...mapState('spinsys', ['spins']),

    spinTypes () {
      let result = []
      for (const spin of this.spins) {
        result.push(spin.spinType)
      }
      return [...new Set(result)]
    }
  },
  methods: {
    init () {
      this.magneticField = parseFloat(this.stateB0)
      this.gyrotronFrequency = parseFloat(this.stateGyrotronfrequency) / 1.0e9
      this.masFrequency = parseFloat(this.stateProbeMas)
      this.increment = parseFloat(this.stateProbeMasIncrement) * 1.0e9
      this.temperature = parseFloat(this.stateProbeTemperature)
      this.acq = this.stateProbeAcq
    },

    ...mapActions('SimSettings', [
      'setMagneticField', 'setGyrotronFrequency',
      'setMas', 'setTemperature', 'setIncrement', 'setAcq'
    ]),
    ...mapGetters('SimSettings', [
      'getB0', 'getEmFreq',
      'getMas', 'getTemperature', 'getMasInc', 'getAcq'
    ]),

    setFieldFreq (fieldValue, freqValue) {
      this.magneticField = parseFloat(fieldValue)
      this.setFieldState()
      this.gyrotronFrequency = parseFloat(freqValue)
      this.setGyrotronFrequencyState()
    },
    setFieldState () {
      this.setMagneticField(parseFloat(this.magneticField))
    },
    setGyrotronFrequencyState () {
      this.setGyrotronFrequency(parseFloat(this.gyrotronFrequency) * 1.0e9)
    },
    setMasFrequencyState () {
      this.setMas(this.masFrequency)
    },
    setTemperatureState () {
      this.setTemperature(this.temperature)
    },
    setIncrementState () {
      this.setIncrement(this.increment * 1.0e-9)
    },
    setAcqState () {
      this.setAcq(this.acq)
    }
  },
  data () {
    return {
      magneticField: 0.0,
      gyrotronFrequency: 0.0,
      masFrequency: 0.0,
      increment: 1e-9,
      temperature: 77,
      acq: 'H1'
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    stateB0 (newValue, oldValue) {
      this.magneticField = parseFloat(newValue)
    },
    stateGyrotronFrequency (newValue, oldValue) {
      this.gyrotronFrequency = parseFloat(newValue) / 1.0e9
    },
    stateProbeMas (newValue, oldValue) {
      this.masFrequency = parseFloat(newValue)
    },
    stateProbeMasIncrement (newValue, oldValue) {
      this.increment = parseFloat(newValue) * 1.0e9
    },
    stateProbeAcq (newValue, oldValue) {
      this.acq = newValue
    }
  }
}
</script>

<style scoped>
.badge-default-btn {
  cursor: pointer;
}
</style>