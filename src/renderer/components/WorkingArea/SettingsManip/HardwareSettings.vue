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
        <input-sync-state
          :name="'Magnetic Field (T)'"
          :stateValue="stateB0"
          v-on:input-sync-state-ok-clicked="setMagneticField"
          class="mt-1"
        >
        </input-sync-state>
        <input-sync-state
          :name="'Gyrotron Frequency (GHz)'"
          :stateValue="stateGyrotronFrequency / 1.0e9"
          v-on:input-sync-state-ok-clicked="setGyrotronFrequencyState"
          class="mb-1"
        >
        </input-sync-state>

        <div class="card">
          <div class="card-body">
            <div class="card-title">
              Probe
            </div>
            <div class="d-flex flex-column">
              <input-sync-state
                :name="'MAS Frequency (Hz)'"
                :stateValue="stateProbeMas"
                v-on:input-sync-state-ok-clicked="setMas"
              >
              </input-sync-state>
              <input-sync-state
                :name="'Increment (ns)'"
                :stateValue="stateProbeMasIncrement * 1.0e9"
                v-on:input-sync-state-ok-clicked="setIncrementState"
              >
              </input-sync-state>
              <input-sync-state
                :name="'Temperature (K)'"
                :stateValue="stateProbeTemperature"
                v-on:input-sync-state-ok-clicked="setTemperature"
              >
              </input-sync-state>
              <div v-if="editAcq" class="d-flex flex-row mb-1"
                @keyup.enter="editAcqOkClicked"
                @keyup.esc="editAcqCancelClicked"
              >
                <div class="p m-1">
                  <span>Acquisition: </span>
                </div>
                <select name="input-acq" id="input-acq"
                  v-model="acq"
                >
                  <option v-for="spinType in spinTypes"
                    :key=spinType
                    :value="spinType"
                  >
                    {{spinType}}
                  </option>
                </select>
                <div class="btn btn-light btn-sm" @click="editAcqOkClicked">
                  <i class="fas fa-check text-success"></i>    
                </div>
                <div class="btn btn-light btn-sm" @click="editAcqCancelClicked">
                  <i class="fas fa-ban text-danger"></i>    
                </div>
              </div>
              <div v-else class="d-flex flex-row mb-1">
                <div>
                  <span>Acquisition: </span>
                  <span
                    class="bg-light px-2 py-1 m-1 border border-info rounded"
                    @click="editAcqClicked"
                  >
                    {{stateProbeAcq}}
                  </span>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import InputSyncState from '../common/InputSyncState'

export default {
  name: 'hardware-settings',
  components: {
    InputSyncState
  },
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
      this.gyrotronFrequency = parseFloat(this.stateGyrotronFrequency) / 1.0e9
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

    syncState () {
      this.init()
    },

    setFieldFreq (fieldValue, freqValue) {
      this.setMagneticField(parseFloat(fieldValue))
      this.setGyrotronFrequencyState(parseFloat(freqValue))
    },
    setGyrotronFrequencyState (value) {
      this.setGyrotronFrequency(parseFloat(value) * 1.0e9)
    },
    setIncrementState (value) {
      this.setIncrement(parseFloat(value) * 1.0e-9)
    },
    editAcqClicked () {
      this.editAcq = true
    },
    editAcqOkClicked () {
      this.setAcq(this.acq)
      this.editAcq = false
    },
    editAcqCancelClicked () {
      this.editAcq = false
    }
  },
  data () {
    return {
      masFrequency: 0.0,
      increment: 1e-9,
      temperature: 77,
      acq: 'H1',
      editAcq: false,

      editB0: false
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.badge-default-btn {
  cursor: pointer;
}
</style>