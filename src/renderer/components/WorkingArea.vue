<template>
  <div id="working-area" clsas="border border-primary flex-fill flex-grow-1 m-1">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" @click="spinsysTabSelected">
        <router-link 
          :to="{ path: '/spinsys'}" 
          class="nav-link"
          :class="{ active: tabIdentity === 'spinsys'}">
          Spin System
        </router-link>
      </li>
      <li class="nav-item" @click="pulseseqTabSelected">
        <router-link 
          :to="{ path: '/pulseseq'}" 
          class="nav-link"
          :class="{ active: tabIdentity === 'pulseseq'}">
          Pulse Sequence
        </router-link>
      </li>
      <li class="nav-item" @click="settingsTabSelected">
        <router-link 
          :to="{ path: '/settings'}" 
          class="nav-link"
          :class="{ active: tabIdentity === 'settings'}">
          Settings
        </router-link>
      </li>
    </ul>   
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'working-area',
  data () {
    return {
      tabIdentity: 'spinsys'
    }
  },
  methods: {
    spinsysTabSelected () { this.tabIdentity = 'spinsys' },
    pulseseqTabSelected () { this.tabIdentity = 'pulseseq' },
    settingsTabSelected () { this.tabIdentity = 'settings' }
  }
}
</script>

<style scoped>
  #working-area {
    margin: 2px;
    border: 1px solid #aaa;
  }
</style>