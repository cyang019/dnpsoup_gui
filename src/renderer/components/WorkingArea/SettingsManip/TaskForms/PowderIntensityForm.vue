<template>
  <div id="powder-intensity-form" class="d-flex flex-column">
    <div class="form-group mb-0">
      <label for="input-ncores" class="col-form-label">
        <span>ncores:</span>
      </label>
      <input type="number" step="1" min="1"
        v-model="ncores"
        @change="setNumCores(ncores)"
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'powder-intensity-form',
  methods: {
    ...mapActions('SimSettings', ['setNumCores'])
  },
  data () {
    return {
      ncores: 1
    }
  }
}
</script>

<style scoped>

</style>
