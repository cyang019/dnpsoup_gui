<template>
  <div>
    <small class="text-muted">Pulse Sequence Summary</small>
    <div v-if="name.length > 0" class="d-flex flex-column">
      <span class="p">{{name}}</span>
      <span class="p">increment: {{increment * 1e9}} ns</span>
      <span v-for="(section, index) in sequence" :key=index>
        {{section.name}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'pulseseq-summary',
  computed: {
    ...mapState('pulseseq', [
      'name', 'increment',
      'emrs', 'sections', 'sequence'
    ])
  }
}
</script>

<style scoped>

</style>