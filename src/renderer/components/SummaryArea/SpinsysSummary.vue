<template>
  <div id='spinsys-summary'>
    <div>
      <span>
        <small class="text-muted">Spin System Summary</small>
      </span>
    </div>
    <div v-if="name === ''">
      <span>no spins</span>
    </div>
    <div v-else>
      <span>{{name}} spin system</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'spinsys-summary',
  computed: {
    ...mapState('spinsys', ['spins', 'interactions', 'irradiation'])
  },
  data () {
    return {
      name: this.genName()
    }
  },
  methods: {
    ...mapGetters('spinsys', ['getSpins']),

    genName () {
      let spinNames = []
      for (let spin of this.getSpins()) {
        const spinTemp = Object.assign({}, spin)
        spinNames.push(spinTemp.spinType)
      }
      return spinNames.join('-')
    }
  },
  watch: {
    spins: {
      handler: function () {
        this.name = this.genName()
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>