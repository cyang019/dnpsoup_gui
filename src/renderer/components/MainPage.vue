<template>
  <div id="home">
    <div id="global-container" class="d-flex flex-column">
      <div id="parameters" class="h-70 d-flex flex-fill flex-row">
        <div class="w-75 upper-left-region">
          <working-area/>
        </div>
        <div class="w-25 upper-right-region">
          <summary-area/>
        </div>
      </div>
      <div class="h-20">
        <info-area></info-area>
      </div>
      <div class="h-10">
        <control-area></control-area>
      </div>
    </div>
  </div>
</template>

<script>
import WorkingArea from './WorkingArea.vue'
import SummaryArea from './SummaryArea.vue'
import ControlArea from './ControlArea.vue'
import InfoArea from './InfoArea.vue'

export default {
  name: 'main-page',
  components: {
    WorkingArea,
    SummaryArea,
    ControlArea,
    InfoArea
  }
}
</script>

<style scoped>
  #home {
    width: 100%;
    height: 100%;
  }

  #global-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    min-width: 200px;
  }

  #parameters {
    overflow: auto;
  }

  .upper-left-region {
    margin: 2px;
  }

  .upper-right-region {
    margin: 2px;
    padding: 5px;
  }
</style>
