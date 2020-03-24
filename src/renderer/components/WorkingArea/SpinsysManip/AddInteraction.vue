<template>
  <div id='add-interaction'>
    <button 
      class='btn btn-secondary btn-sm'
      :class="{disabled: spins.length < 1}"
      @click='adding=true'>
      <i class='far fa-plus-square'></i>
      <span> Add Interaction</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'add-interaction',
  data () {
    return {
      adding: false,
      interaction: {
        id: -1,
        name: '',
        entries: {}
      }
    }
  },
  computed: {
    ...mapState('spinsys', ['spins', 'interactions'])
  }
}
</script>

<style scoped>

</style>
