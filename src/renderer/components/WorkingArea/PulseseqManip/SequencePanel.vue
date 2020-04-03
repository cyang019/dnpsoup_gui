<template>
  <div class="d-flex flex-row">
    <add-sub-sequence></add-sub-sequence>
  </div>
</template>

<script>
import AddSubSequence from './SequencePanel/AddSubSequence.vue'

export default {
  name: 'sequence-panel',
  components: {
    AddSubSequence
  }
}
</script>

<style scoped>

</style>
