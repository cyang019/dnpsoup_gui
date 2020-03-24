<template>
  <div id='interactions'>
    <div v-if="interactions && interactions.length > 0">
      <ul class='list-group'>
        <li v-for="interaction in interactions" :key="interaction.id" 
          class='list-group-item'>
          <p>[{{interaction.id}}]: {{interaction.name}}</p>
        </li>
      </ul>
    </div>
    <div v-else class='placeholder-text'>
      <small>No Interactions.</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'interactions',
  computed: {
    ...mapState('spinsys', ['interactions'])
  }
}
</script>

<style scoped>
.placeholder-text {
  text-align: right;
}
</style>
