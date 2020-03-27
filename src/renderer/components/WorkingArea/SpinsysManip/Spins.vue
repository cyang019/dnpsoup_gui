<template>
  <div id='spins'>
    <div v-if="spins && spins.length > 0">
      <div class='d-flex flex-wrap'>
        <spin-brief
          v-for="spin in spins"
          :key="spin.id"
          v-bind:spin="spin" 
        ></spin-brief>
      </div>
    </div>
    <div v-else>
      <small>No Spins.</small>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SpinBrief from './SpinBrief.vue'

export default {
  name: 'spins',
  components: {
    SpinBrief
  },
  data () {
    return {
      spinsOnPage: this.getSpins()
    }
  },
  methods: {
    ...mapGetters('spinsys', ['getSpins'])
  },
  computed: {
    ...mapState('spinsys', ['spins'])
  },
  watch: {
    spins: {
      handler: function () {
        this.spinsOnPage = this.getSpins()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  #spins {
    margin: 0 0 0 5px;
  }
</style>
