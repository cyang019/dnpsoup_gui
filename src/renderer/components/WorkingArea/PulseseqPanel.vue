<template>
  <div id='pulseseq-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <div>
        <label for="increment">Increment:</label>
        <input type="number" step="any" v-model="increment">
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">ElectroMagnetic Radiations</span>
        </div>
        <emr-panel class="panel-secondary"/>
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">Sections</span>
        </div>
        <section-panel class="panel-secondary"/>
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">Sequence</span>
        </div>
        <sequence-panel class="panel-secondary"/>
      </div>
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
  padding: 1px;
}

.panel-secondary {
  min-height: 100px;
}

.pulseseq-header {
  font-size: 0.8rem;
  color: #aaaaaa;
  height: 1.2rem;
  padding: 1px 1rem;
  text-align: 'center'
}
</style>
