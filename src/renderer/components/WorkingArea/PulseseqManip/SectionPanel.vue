<template>
  <div class='d-flex flex-row'>
    <add-section></add-section>
    <div v-for="section in sections" :key="section.name">
      <section-brief :section="section"></section-brief>
    </div>
  </div>
</template>

<script>
import AddSection from './SectionPanel/AddSection'
import SectionBrief from './SectionPanel/SectionBrief'
import { mapState } from 'vuex'

export default {
  name: 'section-panel',
  components: {
    AddSection,
    SectionBrief
  },
  computed: {
    ...mapState('pulseseq', ['sections'])
  }
}
</script>

<style scoped>

</style>