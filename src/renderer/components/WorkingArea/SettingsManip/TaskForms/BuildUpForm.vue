<template>
  <div id="buildup-form" class="d-flex flex-column">
    <input-sync-state
      :name="'sampling step size'"
      :stateValue="stateSamplingStepSize"
      v-on:input-sync-state-ok-clicked="setSamplingStepSize"
    ></input-sync-state>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'buildup-form',
  computed: {
    ...mapState('SimSettings', {
      stateSamplingStepSize: state => state.simulation.task.taskDetails.samplingStepSize
    })
  },
  methods: {
    ...mapActions('SimSettings', ['setSamplingStepSize'])
  }
}
</script>

<style scoped>

</style>
