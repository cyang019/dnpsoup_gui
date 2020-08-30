<template>
  <div id="powder-buildup-enhancement-form" class="d-flex flex-column">
    <input-sync-state
      :name="'ncores'"
      :stateValue="stateNCores"
      v-on:input-sync-state-ok-clicked="setNumCores"
    ></input-sync-state>
    <input-sync-state
      :name="'sampling step size'"
      :stateValue="stateSamplingStepSize"
      v-on:input-sync-state-ok-clicked="setSamplingStepSize"
    ></input-sync-state>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import InputSyncState from '../../common/InputSyncState'

export default {
  name: 'powder-buildup-enhancement-form',
  components: {
    InputSyncState
  },
  computed: {
    ...mapState('SimSettings', {
      stateNCores: state => state.simulation.ncores,
      stateSamplingStepSize: state => state.simulation.task.taskDetails.samplingStepSize
    })
  },
  methods: {
    ...mapActions('SimSettings', ['setNumCores', 'setSamplingStepSize'])
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

