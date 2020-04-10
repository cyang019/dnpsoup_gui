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
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'field-profile-form',
  data () {
    return {
      ncores: 1,
      scanOption: ''
    }
  },
  methods: {
    ...mapActions('SimSettings', ['setNumCores'])
  }
}
</script>

<style scoped>

</style>
