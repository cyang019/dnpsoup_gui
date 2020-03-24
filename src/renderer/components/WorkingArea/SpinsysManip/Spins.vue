<template>
  <div id='spins'>
    <div v-if="spins && spins.length > 0">
      <ul class='list-group'>
        <li v-for="spin in spins" :key="spin.id" 
          class='list-group-item'
          :class='spin.spinType'>
          <p>[{{spin.id}}]: {{spin.spinType}}</p>
        </li>
      </ul>
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
  .H {
    background-color: #ff6666
  }
  .D {
    background-color: #ff9999
  }
  .e {
    background-color: #66ff66
  }
  .C13 {
    background-color: #666666
  }
  .N15 {
    background-color: #6666ff
  }
</style>
