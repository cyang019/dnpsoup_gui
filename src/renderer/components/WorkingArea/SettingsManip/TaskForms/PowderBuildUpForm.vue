<template>
  <div id="powder-buildup-form" class="d-flex flex-column">
    <input-sync-state
      :name="'ncores'"
      :stateValue="stateNCores"
      v-on:input-sync-state-ok-clicked="setNumCores"
    ></input-sync-state>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import InputSyncState from '../../common/InputSyncState'

export default {
  name: 'powder-buildup-form',
  components: {
    InputSyncState
  },
  computed: {
    ...mapState('SimSettings', {
      stateNCores: state => state.simulation.ncores
    })
  },
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

