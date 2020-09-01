<template>
  <div id='spinsys-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <div class='d-flex flex-column'>
        <div id='spinsys-manip' class='d-flex flex-row'>
          <div class='spinsys-manip mr-auto'>
            <add-spin/>
          </div>
          <div class='spinsys-manip ml-auto'>
            <add-interaction/>
          </div>
        </div>
        <div id='spins-info' class='d-flex flex-column align-items-left'>
          <spins/>
        </div>
        <div id='interactions-info' class='d-flex flex-column align-items-right'>
          <interactions/>
        </div>
        <div>
          <spin-groups/>
        </div>
      </div>

      <spinsys-canvas/>
    </div>
  </div>
</template>

<script>
import SpinsysCanvas from './SpinsysManip/SpinsysCanvas'
import AddSpin from './SpinsysManip/AddSpin'
import AddInteraction from './SpinsysManip/AddInteraction'
import Spins from './SpinsysManip/Spins'
import Interactions from './SpinsysManip/Interactions'
import SpinGroups from './SpinsysManip/SpinGroups'

export default {
  name: 'spinsys-panel',
  components: {
    SpinsysCanvas,
    AddSpin,
    AddInteraction,
    Spins,
    Interactions,
    SpinGroups
  }
}
</script>

<style scoped>
  #spinsys-panel {
    height: 100%;
  }
  
  #spins-info {
    padding: 0 2px 0 0;
  }
  #interactions-info {
    padding: 0 0 0 2px;
  }

  .spinsys-manip {
    margin: 0 1px;
  }
</style>
