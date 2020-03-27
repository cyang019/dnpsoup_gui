<template>
  <div id='interactions'>
    <div v-if="interactions && interactions.length > 0">
      <div class='d-flex flex-row-reverse flex-wrap'>
        <interaction-brief
          v-for="interaction in interactions"
          :key="interaction.id"
          v-bind:interaction="interaction" 
        >
        </interaction-brief>
      </div>
    </div>
    <div v-else class='placeholder-text'>
      <small>No Interactions.</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InteractionBrief from './InteractionBrief.vue'

export default {
  name: 'interactions',
  components: {
    InteractionBrief
  },
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
</style>
