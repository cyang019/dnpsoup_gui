<template>
  <div class="card">
    <div class="card-header">
      <span>sample settings</span>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column">
        <div>Sample Euler</div>
        <div class="form-group mb-0">
          <label class="col-form-label">
            {{ decode(msgAlpha) }}
          </label>
          <input type="number" step="any"
            class="col-md-3"
            v-model="xtalEuler.alpha"
            @change="setXtalEulerAlpha(xtalEuler.alpha)"
          >
          <label class="col-form-label">
            {{ decode(msgBeta) }}
          </label>
          <input type="number" step="any"
            class="col-md-3"
            v-model="xtalEuler.beta"
            @change="setXtalEulerBeta(xtalEuler.beta)"
          >
          <label class="col-form-label">
            {{ decode(msgGamma) }}
          </label>
          <input type="number" step="any"
            class="col-md-3"
            v-model="xtalEuler.gamma"
            @change="setXtalEulerGamma(xtalEuler.gamma)"
          >
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
          <div v-if="powderOption === 'zcw'" class="form-group mb-0">
            <label for="zcw-value" class="col-form-label">
              zcw index
            </label>
            <input type="number" step="1" name="zcw-value" id="zcw-value"
              v-model="eulerScheme.zcw"
              @change="setEulerZCWValue(eulerScheme.zcw)"
            >
            <label for="" class="col-form-label">Number of angles: {{zcwCount}}</label>
          </div>
          <div v-if="powderOption === 'eulers'">
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
                v-for="euler in customEulers" :key="euler.id" 
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

export default {
  name: 'sample-settings',
  computed: {
    ...mapState('SimSettings', {
      taskName: state => state.simulation.task.name
    }),

    showPowderOptions () {
      return !['BuildUp', 'Intensity', 'EigenValues'].includes(this.taskName)
    },
    zcwCount () {
      if (this.eulerScheme.zcw === undefined || this.eulerScheme.zcw === '') {
        return 0
      } else if (this.eulerScheme.zcw === 0) {
        return 21
      } else if (this.eulerScheme.zcw === 1) {
        return 34
      }
      let zcw0 = 8
      let zcw1 = 13
      for (let i = 1; i < parseInt(this.eulerScheme.zcw) + 2; ++i) {
        let temp = parseInt(zcw0) + parseInt(zcw1)
        zcw0 = parseInt(zcw1)
        zcw1 = parseInt(temp)
      }
      return zcw1
    }
  },
  data () {
    return {
      xtalEuler: this.getXtalEuler(),
      eulerScheme: {
        zcw: this.getEulerSchemeZcw()
      },
      powderOption: this.getPowderOption(),
      // a list of {alpha, beta, gamma}'s
      customEulers: this.getEulers(),
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
      'setEulerPowderOption',
      'setEulerZCWValue', 'addEuler', 'removeEuler'
    ]),
    ...mapGetters('SimSettings', [
      'getXtalEuler', 'getPowderOption', 'getEulerSchemeZcw', 'getEulers'
    ]),

    decode (str) {
      return decode(str)
    },
    addCustomEuler () {
      this.customEulers.push(Object.assign({}, this.tempEuler))
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
      this.customEulers = this.customEulers.filter(euler => euler.id !== eulerId)
      this.removeEuler(eulerId)
    }
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