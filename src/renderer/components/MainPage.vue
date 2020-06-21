<template>
  <div id="home" class="d-flex flex-column">
    <div id="parameters"
      class="h-70 d-flex flex-fill flex-row m-0 p-0"
    >
      <div class="w-75 m-2 p-0">
        <working-area/>
      </div>
      <div class="w-25 m-2 p-1">
        <summary-area/>
      </div>
    </div>
    <div class="d-flex flex-fill">
      <info-area></info-area>
    </div>
    <div class="h-10">
      <control-area></control-area>
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
    overflow: auto;
    min-width: 200px;
  }

  #parameters {
    overflow: auto;
  }
</style>
