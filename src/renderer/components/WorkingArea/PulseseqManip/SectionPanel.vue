<template>
  <div id="section-panel" class='d-flex flex-row'>
    <div v-for="section in sections" :key="section.name"
      class="d-flex m-0 p-0"
    >
      <section-brief
        :section="section"
      ></section-brief>
    </div>
    <add-section></add-section>
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
#section-panel {
  overflow-x: scroll;
  min-height: 100px;
}
</style>