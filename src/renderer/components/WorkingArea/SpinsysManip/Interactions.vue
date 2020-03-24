<template>
  <div id='interactions'>
    <div v-if="interactions && interactions.length > 0">
      <div class='d-flex flex-row-reverse'>
        <div v-for="interaction in interactions" :key="interaction.id"
          class='interaction-item rounded align-middle text-center border border-secondary text-secondary'>
          <span class='p-1'>[{{interaction.id}}]: {{interaction.name}}</span>
        </div>
      </div>
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

#interactions {
  margin: 0 0 0 5px;
}

.interaction-item {
  font-size: 0.8rem;
  height: 1.4rem;
  width: 6rem;
  margin: 1px 2px;
}
</style>
