<template>
  <div id="eigen-values-form" class="d-flex flex-column">
    <div class="form-group mb-0">
      <label for="input-ncores" class="col-form-label">
        <span>ncores:</span>
      </label>
      <input type="number" step="1" 
        v-model="ncores"
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'eigen-values-form',
  computed: {
    ...mapState('settings', ['simulation'])
  },
  data () {
    return {
      ncores: 1
    }
  },
  methods: {
    ...mapActions('settings', ['setNumCores'])
  },
  watch: {
    ncores: {
      handler: function () {
        this.setNumCores(parseInt(this.ncores))
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
