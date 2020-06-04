<template>
  <div id='pulseseq-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <div class="form-group">
        <label for="pulseseq-name" class="col-form-label">
          Name:
        </label>
        <input type="text" id="pulseseq-name" 
          v-model="name"
          @change="setName(name)"
        >
        <label for="increment" class="col-form-label">
          Increment (ns):
        </label>
        <input type="number" id="increment" step="any" 
          v-model="increment"
          @change="setIncrement(increment * 1.0e-9)"
        >
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
import { mapActions } from 'vuex'

import EmrPanel from './PulseseqManip/EmrPanel'
import SectionPanel from './PulseseqManip/SectionPanel'
import SequencePanel from './PulseseqManip/SequencePanel'

export default {
  name: 'pulseseq-panel',
  data () {
    return {
      increment: 1.0,
      name: ''
    }
  },
  components: {
    EmrPanel,
    SectionPanel,
    SequencePanel
  },
  methods: {
    ...mapActions('pulseseq', ['setName', 'setIncrement'])
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

.pulseseq-header {
  font-size: 0.9rem;
  padding: 1px 1rem;
  text-align: 'center'
}
</style>
