<template>
  <div class="card">
    <div class="card-header">
      <span>sample settings</span>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column">
        <div>Sample Euler</div>
        <div v-if="editXtalEuler" 
          class="d-flex flex-row"
          @keyup.enter="editXtalEulerOkClicked"
          @keyup.esc="editXtalEulerCancelClicked"
        >
          <div class="p m-1">
            <span>{{decode(msgAlpha)}}</span>
          </div>
          <input type="number" step="any"
            class="col-md-3"
            v-model="xtalEuler.alpha"
          >
          <div class="p m-1">
            <span>{{decode(msgBeta)}}</span>
          </div>
          <input type="number" step="any"
            class="col-md-3"
            v-model="xtalEuler.beta"
          >
          <div class="p m-1">
            <span>{{decode(msgGamma)}}</span>
          </div>
          <input type="number" step="any"
            class="col-md-3"
            v-model="xtalEuler.gamma"
          >
          <div class="btn btn-light btn-sm" @click="editXtalEulerOkClicked">
            <i class="fas fa-check text-success"></i>    
          </div>
          <div class="btn btn-light btn-sm" @click="editXtalEulerCancelClicked">
            <i class="fas fa-ban text-danger"></i>    
          </div>
        </div>
        <div v-else class="d-flex flex-row"
          @click=editXtalEulerClicked()
        >
          <div class="p mx-3">
            <span>{{ decode(msgAlpha) }}:</span>
            <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
              {{ stateSampleEuler.alpha }}
            </span>
          </div>
          <div class="p mx-3">
            <span>{{ decode(msgBeta) }}:</span>
            <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
              {{ stateSampleEuler.beta }}
            </span>
          </div>
          <div class="p mx-3">
            <span>{{ decode(msgGamma) }}:</span>
            <span class="bg-light pr-2 pl-1 border-bottom border-secondary-bottom">
              {{ stateSampleEuler.gamma }}
            </span>
          </div>
        </div>
        <div v-if="showPowderOptions" 
          class="d-flex flex-column"
        >
          <div class="col-form-label mb-0">
            Powder Input
          </div>
          <div class="form-group mb-0">
            <input type="radio" 
              name="radio-powder-zcw" id="radio-powder-zcw"
              v-model="powderOption" value="zcw"
              @change="setEulerPowderOption(powderOption)"
            >
            <label for="radio-powder-zcw" class="col-form-label">
              zcw
            </label>
            <input type="radio" 
              name="radio-powder-angles" id="radio-powder-angles"
              v-model="powderOption" value="eulers"
              @change="setEulerPowderOption(powderOption)"
            >
            <label for="radio-powder-angles" class="col-form-label">
              custom angles
            </label>
          </div>
          <div v-if="stateEulerOption === 'zcw'" class="d-flex flex-row">
            <input-sync-state
              :name="'zcw index'"
              :stateValue="stateZcwValue"
              v-on:input-sync-state-ok-clicked="setEulerZCWValue"
              class="mr-2"
            >
            </input-sync-state>
            <label for="" class="col-form-label">Number of angles: {{zcwCount}}</label>
          </div>
          <div v-if="stateEulerOption === 'zcw'" class="d-flex flex-row">
            <select v-model="sphere" @change="setEulerZCWPowderSphere(sphere)">
              <option disabled :value="-1">Please select one</option>
              <option :value="0">Full sphere</option>
              <option :value="1">Hemisphere</option>
              <option :value="2">Octant</option>
            </select>
            <div>
              <span class="mr-1">Sphere Set:</span>
              <span v-if="stateZcwPowderSphere === 0">Full sphere</span>
              <span v-else-if="stateZcwPowderSphere === 1">Hemisphere</span>
              <span v-else-if="stateZcwPowderSphere === 2">Octant</span>
              <span v-else>unknown</span>
            </div>
          </div>
          <div v-if="stateEulerOption === 'eulers'">
            <div class="form-group mb-0">
              <label class="col-form-label">
                {{ decode(msgAlpha) }}
              </label>
              <input type="number" step="any"
                class="col-md-3"
                v-model="tempEuler.alpha"
              >
              <label class="col-form-label">
                {{ decode(msgBeta) }}
              </label>
              <input type="number" step="any"
                class="col-md-3"
                v-model="tempEuler.beta"
              >
              <label class="col-form-label">
                {{ decode(msgGamma) }}
              </label>
              <input type="number" step="any"
                class="col-md-3"
                v-model="tempEuler.gamma"
              >
              <button class='btn btn-primary btn-sm' @click="addCustomEuler">
                <i class='fas fa-plus'></i>
              </button>
            </div>
            <div class="d-flex flex-wrap">
              <div
                v-for="euler in stateSampleEulers" :key="euler.id" 
                class="badge badge-secondary mr-1 mb-1"
              >
                <span class="mr-1">{{decode(msgAlpha)}} {{euler.alpha}}</span>
                <span class="mr-1">{{decode(msgBeta)}} {{euler.beta}}</span>
                <span class="mr-1">{{decode(msgGamma)}} {{euler.gamma}}</span>
                <span class="ml-1">
                  <i class="fas fa-times item-custom-euler" 
                    @click="removeCustomEuler(euler.id)"
                  ></i>
                </span>
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
import { decode } from 'he'
import InputSyncState from '../common/InputSyncState'

export default {
  name: 'sample-settings',
  components: {
    InputSyncState
  },
  computed: {
    ...mapState('SimSettings', {
      taskName: state => state.simulation.task.name,
      stateSampleEuler: state => state.sample.euler,
      stateEulerOption: state => state.sample.eulerOption,
      stateSampleEulers: state => state.sample.eulers,
      stateZcwValue: state => state.sample.eulerScheme.zcw,
      stateZcwPowderSphere: state => state.sample.eulerScheme.sphere
    }),

    showPowderOptions () {
      return !['BuildUp', 'Intensity', 'EigenValues'].includes(this.taskName)
    },
    zcwCount () {
      if (this.stateZcwValue === undefined || this.stateZcwValue === '') {
        return 0
      } else if (this.stateZcwValue === 0) {
        return 21
      } else if (this.stateZcwValue === 1) {
        return 34
      }
      let zcw0 = 8
      let zcw1 = 13
      for (let i = 1; i < parseInt(this.stateZcwValue) + 2; ++i) {
        let temp = parseInt(zcw0) + parseInt(zcw1)
        zcw0 = parseInt(zcw1)
        zcw1 = parseInt(temp)
      }
      return zcw1
    }
  },
  data () {
    return {
      xtalEuler: {
        alpha: 0.0,
        beta: 0.0,
        gamma: 0.0
      },
      sphere: 0,
      editXtalEuler: false,
      powderOption: '',
      // a list of {alpha, beta, gamma}'s
      // customEulers: [],
      tempEuler: {
        alpha: 0.0,
        beta: 0.0,
        gamma: 0.0,
        id: 0
      },
      msgAlpha: '&#x3B1;',
      msgBeta: '&#x3B2;',
      msgGamma: '&#x3B3;'
    }
  },
  methods: {
    ...mapActions('SimSettings', [
      'setXtalEulerAlpha', 'setXtalEulerBeta', 'setXtalEulerGamma',
      'setSampleEuler',
      'setEulerPowderOption',
      'setEulerZCWValue', 'setEulerZCWPowderSphere',
      'addEuler', 'removeEuler'
    ]),
    ...mapGetters('SimSettings', [
      'getXtalEuler', 'getPowderOption', 'getEulerSchemeZcw', 'getEulers'
    ]),

    init () {
      let angles = this.getXtalEuler()
      this.xtalEuler.alpha = parseFloat(angles.alpha)
      this.xtalEuler.beta = parseFloat(angles.beta)
      this.xtalEuler.gamma = parseFloat(angles.gamma)
      this.powderOption = this.getPowderOption()
      this.customEulers = this.getEulers()
    },

    decode (str) {
      return decode(str)
    },
    addCustomEuler () {
      this.addEuler(Object.assign({}, this.tempEuler))
      let tempId = parseInt(this.tempEuler.id) + 1
      this.tempEuler = {
        alpha: 0.0,
        beta: 0.0,
        gamma: 0.0,
        id: parseInt(tempId)
      }
    },
    removeCustomEuler (eulerId) {
      this.removeEuler(eulerId)
    },
    editXtalEulerClicked () {
      this.xtalEuler.alpha = parseFloat(this.stateSampleEuler.alpha)
      this.xtalEuler.beta = parseFloat(this.stateSampleEuler.beta)
      this.xtalEuler.gamma = parseFloat(this.stateSampleEuler.gamma)
      this.editXtalEuler = true
    },
    editXtalEulerOkClicked () {
      this.editXtalEuler = false
      this.setSampleEuler(this.xtalEuler)
    },
    editXtalEulerCancelClicked () {
      this.editXtalEuler = false
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.card-body {
  padding: 4px;
}

.item-custom-euler {
  cursor: pointer;
}
</style>