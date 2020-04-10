<template>
  <div id="eigen-values-form" class="d-flex flex-column">
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'eigen-values-form',
  computed: {
    ...mapState('SimSettings', ['simulation'])
  },
  data () {
    return {
      ncores: 1
    }
  },
  methods: {
    ...mapActions('SimSettings', ['setNumCores'])
  }
}
</script>

<style scoped>

</style>
