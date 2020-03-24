<template>
  <div id='spins'>
    <div v-if="spins && spins.length > 0">
      <div class='d-flex flex-row'>
        <div v-for="spin in spins" :key="spin.id" 
          class='spin-item rounded align-middle text-center border border-primary text-primary'
          >
          <span class='p-1'>[{{spin.id}}] {{spin.spinType}}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <small>No Spins.</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'spins',
  computed: {
    ...mapState('spinsys', ['spins'])
  }
}
</script>

<style scoped>
  #spins {
    margin: 0 0 0 5px;
  }

  .spin-item {
    font-size: 0.8rem;
    height: 1.4rem;
    width: 4rem;
    margin: 1px 2px;
  }

  .H1 {
    background-color: #ffffff;
    color: #666666;
  }
  .D2 {
    background-color: #dddddd;
    color: #555555;
  }
  .e {
    background-color: #d0fcd0;
    color: #444444;
  }
  .C13 {
    background-color: #919090;
    color: #ffffff;
  }
  .N15 {
    background-color: #4e4ee4;
    color: #ffffff;
  }
</style>
