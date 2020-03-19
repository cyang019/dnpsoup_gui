<template>
  <div id="home">
    <div class="d-flex flex-column">
      <div id="parameters" class="h-70 flex-fill d-flex flex-row">
        <div class="w-75">
          <working-area/>
        </div>
        <div class="w-25">
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
</style>
