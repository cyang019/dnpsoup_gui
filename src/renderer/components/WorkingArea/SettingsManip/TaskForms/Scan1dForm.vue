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
    <div v-if="scanType==='GammaB1'" 
      class="d-flex flex-column"
    >
      <div class="form-group">
        <label for="select-scan-name col-form-label">
          emr name
        </label>
        <select 
          name="select-scan-name" 
          id="select-scan-name"
          v-model="name"
          @change="setScanName(name)"
        >
          <option v-for="emr in emrs"
            :key="emr.name"
            :value="emr.name"
          >
            {{emr.name}}
          </option>
        </select>
      </div>
      <div class="form-group">
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
            v-for="c in emrs.find(emr => emr.name === name).channels"
            :key="c.spinType"
            :value="c.spinType"
          >
            {{c.spinType}}
          </option>
        </select>
      </div>
    </div>
    <div v-if="scanType==='EmrPhase'">
    </div>
    <div v-if="scanType==='EmrLength'">
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'scan1d-form',
  computed: {
    ...mapState('SimSettings', {
      'scanTypes': state => state.simulation.task.taskDetails.scanTypes
    }),
    ...mapState('pulseesq', [
      'sections', 'emrs'
    ])
  },
  methods: {
    ...mapActions('SimSettings', [
      'setNumCores',
      'setScanType', 'setScanName', 'setScanSpin'
    ])
  },
  data () {
    return {
      ncores: 1,
      scanType: '',
      type: '',
      spin: '',
      name: '',
      range: {
        begin: 0,
        end: 0,
        step: 0
      }
    }
  }
}
</script>

<style scoped>

</style>
