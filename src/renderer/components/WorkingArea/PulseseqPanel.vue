<template>
  <div id='pulseseq-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <input-sync-state
        :name="'Name'"
        :stateValue="stateName"
        :type="'text'"
        v-on:input-sync-state-ok-clicked="setName"
      >
      </input-sync-state>
      <input-sync-state
        :name="'Increment (ns)'"
        :stateValue="stateIncrement * 1e9"
        v-on:input-sync-state-ok-clicked="setIncrementState"
      >
      </input-sync-state>  
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">ElectroMagnetic Radiations</span>
        </div>
        <emr-panel class="card-body"/>
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">Sections</span>
        </div>
        <section-panel class="card-body"/>
      </div>
      <div class="card">
        <div class="card-header pulseseq-header">
          <span class="panel-title">Sequence</span>
        </div>
        <sequence-panel class="card-body"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import EmrPanel from './PulseseqManip/EmrPanel'
import SectionPanel from './PulseseqManip/SectionPanel'
import SequencePanel from './PulseseqManip/SequencePanel'
import InputSyncState from './common/InputSyncState'

export default {
  name: 'pulseseq-panel',
  data () {
    return {
      increment: 1.0,
      name: '',

      editName: false,
      editIncrement: false
    }
  },
  computed: {
    ...mapState('pulseseq', {
      'stateName': state => state.name,
      'stateIncrement': state => state.increment
    })
  },
  components: {
    EmrPanel,
    SectionPanel,
    SequencePanel,
    InputSyncState
  },
  methods: {
    ...mapActions('pulseseq', ['setName', 'setIncrement']),

    init () {
      this.increment = parseFloat(this.stateIncrement) * 1e9
      this.name = this.stateName
    },
    setIncrementState (value) {
      this.setIncrement(parseFloat(value) * 1.0e-9)
    }
  },
  mounted () {
    this.init()
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
