<template>
  <div id='pulseseq-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <div>
        <label for="increment">Increment:</label>
        <input type="number" step="any" v-model="increment">
      </div>
      <emr-panel class="panel-secondary"/>
      <section-panel class="panel-secondary"/>
      <sequence-panel class="panel-secondary"/>
    </div>
  </div>
</template>

<script>
import EmrPanel from './PulseseqManip/EmrPanel'
import SectionPanel from './PulseseqManip/SectionPanel'
import SequencePanel from './PulseseqManip/SequencePanel'

export default {
  name: 'pulseseq-panel',
  data () {
    return {
      increment: 1.0e-9
    }
  },
  components: {
    EmrPanel,
    SectionPanel,
    SequencePanel
  }
}
</script>

<style scoped>
#pulseseq-panel {
  height: 100%;
}

.panel-secondary {
  min-height: 100px;
}
</style>
