<template>
  <div id='spinsys-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <add-spin/>
      <spins/>
      <spinsys-canvas/>
      <add-interaction/>
      <interactions/>
    </div>
  </div>
</template>

<script>
import SpinsysCanvas from './SpinsysManip/SpinsysCanvas'
import AddSpin from './SpinsysManip/AddSpin'
import AddInteraction from './SpinsysManip/AddInteraction'
import Spins from './SpinsysManip/Spins'
import Interactions from './SpinsysManip/Interactions'

export default {
  name: 'spinsys-panel',
  components: {
    SpinsysCanvas,
    AddSpin,
    AddInteraction,
    Spins,
    Interactions
  }
}
</script>

<style scoped>

</style>
