<template>
  <div id='pulseseq-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <div v-if="editName" class='d-flex flex-row'>
        <div class="p m-2">
          <span>Name: </span>
        </div>
        <input type="text" id="pulseseq-name" 
          v-model="name"
        >
        <div class="btn btn-light p-2" @click="editNameOkClicked">
          <i class="fas fa-check"></i>    
        </div>
        <div class="btn btn-light p-2" @click="editNameCancelClicked">
          <i class="fas fa-ban"></i>    
        </div>
      </div>
      <div v-else class='d-flex flex-row'>
        <div class="p m-2">
          <span>Name: {{stateName}}</span>
        </div>
        <div class="btn btn-light" @click="editNameClicked">
          <i class="fas fa-pen"></i>    
        </div>
      </div>
      <div v-if="editIncrement" class='d-flex flex-row'>
        <div class="p m-2">
          <span>Increment (ns): </span>
        </div>
        <input type="number" id="pulseseq-name" step="any"
          v-model="increment"
        >
        <div class="btn btn-light p-2" @click="editIncrementOkClicked">
          <i class="fas fa-check"></i>    
        </div>
        <div class="btn btn-light p-2" @click="editIncrementCancelClicked">
          <i class="fas fa-ban"></i>    
        </div>
      </div>
      <div v-else class='d-flex flex-row'>
        <div class="p m-2">
          <span>Increment (ns): {{stateIncrement}}</span>
        </div>
        <div class="btn btn-light" @click="editIncrementClicked">
          <i class="fas fa-pen"></i>    
        </div>
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
import { mapActions, mapState } from 'vuex'

import EmrPanel from './PulseseqManip/EmrPanel'
import SectionPanel from './PulseseqManip/SectionPanel'
import SequencePanel from './PulseseqManip/SequencePanel'

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
    SequencePanel
  },
  methods: {
    ...mapActions('pulseseq', ['setName', 'setIncrement']),

    init () {
      this.increment = parseFloat(this.stateIncrement) * 1e9
      this.name = this.stateName
    },

    editNameClicked () {
      this.name = this.stateName
      this.editName = true
    },
    editNameCancelClicked () {
      this.name = this.stateName
      this.editName = false
    },
    editNameOkClicked () {
      this.setName(this.name)
      this.editName = false
    },

    editIncrementClicked () {
      this.increment = parseFloat(this.stateIncrement) * 1e9
      this.editIncrement = true
    },
    editIncrementCancelClicked () {
      this.increment = parseFloat(this.stateIncrement) * 1e9
      this.editIncrement = false
    },
    editIncrementOkClicked () {
      this.setIncrement(parseFloat(this.increment) * 1e-9)
      this.editIncrement = false
    },

    syncState () {
      this.init()
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
