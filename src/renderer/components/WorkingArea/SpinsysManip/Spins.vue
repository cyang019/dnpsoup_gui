<template>
  <div id='spins'>
    <div v-if="isEmpty(spins)">
      <small>No Interactions.</small>
    </div>
    <div v-else>
      <ul>
        <li v-for="(key, spin) in spins" :key="key">
          <button class='btn btn-secondary btn-sm'>
            {{key}} {{spin}}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'spins',
  computed: {
    ...mapState('spinsys', {'spins': 'state.spins'})
  },
  methods: {
    isEmpty (obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>
