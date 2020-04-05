<template>
  <div class="d-flex flex-row">
    <section-abstract
      v-for="name in sequence" :key="name"
      v-bind:sectionName="name"
      v-on:remove-subsequence-name="deleteNameInSequence($event)"
    >
    </section-abstract>
    <add-sub-sequence></add-sub-sequence>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddSubSequence from './SequencePanel/AddSubSequence.vue'
import SectionAbstract from './SequencePanel/SectionAbstract.vue'

export default {
  name: 'sequence-panel',
  components: {
    AddSubSequence,
    SectionAbstract
  },
  computed: {
    ...mapState('pulseseq', ['sequence'])
  },
  methods: {
    ...mapActions('pulseseq', ['deleteNameInSequence'])
  }
}
</script>

<style scoped>

</style>
