<template>
  <div id="field-profile-form" class="d-flex flex-column">
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
        <div
          class="form-group mb-0"
        >
          <label for="input-range-begin" 
            class="col-form-label"
          >
            Begin
          </label>
          <input type="number" step="any"
            class="col-md-3"
            name="input-range-begin" 
            id="input-range-begin"
            v-model="range.begin"
            @change="updateRangeBegin"
          >
          <label for="input-range-end" 
            class="col-form-label"
          >
            End
          </label>
          <input type="number" step="any"
            class="col-md-3"
            name="input-range-end"
            id="input-range-end"
            v-model="range.end"
            @change="updateRangeEnd"
          >
          <label for="input-range-Step" 
            class="col-form-label"
          >
            Step
          </label>
          <input type="number"
            class="col-md-3"
            name="input-range-step" 
            id="input-range-step"
            v-model="range.step"
            @change="updateRangeStep"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'field-profile-form',
  data () {
    return {
      ncores: 1,
      scanOption: '',
      range: {
        begin: 0,
        end: 0,
        step: 0
      }
    }
  },
  methods: {
    ...mapActions('SimSettings', [
      'setNumCores',
      'setEmrRangeBegin', 'setEmrRangeEnd',
      'setEmrRangeStep',
      'setFieldRangeBegin', 'setFieldRangeEnd',
      'setFIeldRangeStep'
    ]),
    updateRangeBegin () {
      if (this.scanOption === 'b0') {
        this.setFieldRangeBegin(this.range.begin)
      } else if (this.scanOption === 'emr') {
        this.setEmrRangeBegin(this.range.begin)
      }
    },
    updateRangeEnd () {
      if (this.scanOption === 'b0') {
        this.setFieldRangeEnd(this.range.end)
      } else if (this.scanOption === 'emr') {
        this.setEmrRangeBegin(this.range.end)
      }
    },
    updateRangeStep () {
      if (this.scanOption === 'b0') {
        this.setFieldRangeStep(this.range.step)
      } else if (this.scanOption === 'emr') {
        this.setEmrRangeStep(this.range.step)
      }
    }
  }
}
</script>

<style scoped>

</style>
