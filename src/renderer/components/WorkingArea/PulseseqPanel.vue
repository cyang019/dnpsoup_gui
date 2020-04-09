<template>
  <div id='pulseseq-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <div class="d-flex flex-row">
        <label for="pulseseq-name" class="col-form-label">
          Name:
        </label>
        <input type="text" id="pulseseq-name" v-model="name">
        <label for="increment" class="col-form-label">
          Increment:
        </label>
        <input type="number" id="increment" step="any" v-model="increment">
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">ElectroMagnetic Radiations</span>
        </div>
        <emr-panel class="card-body panel-secondary"/>
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">Sections</span>
        </div>
        <section-panel class="card-body panel-secondary"/>
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">Sequence</span>
        </div>
        <sequence-panel class="card-body panel-secondary"/>
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
      increment: 1.0e-9,
      name: ''
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

.card-body {
  padding: 0;
}

.panel-secondary {
  min-height: 100px;
}

.pulseseq-header {
  font-size: 0.9rem;
  padding: 1px 1rem;
  text-align: 'center'
}
</style>
