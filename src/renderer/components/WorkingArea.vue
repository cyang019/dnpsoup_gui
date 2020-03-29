<template>
  <div id="working-area" class="border border-primary container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item"
        v-for="panel in panels"
        v-bind:key="panel"
        @click="currentPanel = panel"
      >
        <div :class="['nav-link', { 'active': currentPanel === panel }]">
          <span>{{panelNames[panel]}}</span>
        </div>
      </li>
    </ul>   
    <keep-alive>
      <component v-bind:is="currentPanelComponent">
      </component>
    </keep-alive>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SpinsysPanel from './WorkingArea/SpinsysPanel.vue'
import PulseseqPanel from './WorkingArea/PulseseqPanel.vue'
import SettingsPanel from './WorkingArea/SettingsPanel.vue'

export default {
  name: 'working-area',
  components: {
    SpinsysPanel,
    PulseseqPanel,
    SettingsPanel
  },
  data () {
    return {
      currentPanel: 'Spinsys',
      panels: [
        'Spinsys',
        'Pulseseq',
        'Settings'
      ],
      panelNames: {
        'Spinsys': 'Spin System',
        'Pulseseq': 'Pulse Sequence',
        'Settings': 'Settings'
      }
    }
  },
  computed: {
    currentPanelComponent () {
      return this.currentPanel.toLowerCase() + '-panel'
    }
  },
  methods: {
    ...mapActions('spinsys', ['resetSpinsys'])
  },
  mounted () {
    this.resetSpinsys()
  }
}
</script>

<style scoped>
  #working-area {
    margin: 2px;
    overflow: scroll;
  }

  .nav-tabs {
    cursor: pointer;
  }
</style>