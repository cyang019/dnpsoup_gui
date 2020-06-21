<template>
  <div id='input-summary' class="m-0 p-0">
    <div class="container-fuild m-0 p-0">
      <div class="col-12 h-100">
        <spinsys-summary class="row-4 summary-item h-33"/>
        <pulseseq-summary class="row-4 summary-item h-33"/>
        <settings-summary class="row-4 summary-item h-33"/>
      </div>
    </div>
  </div>
</template>

<script>
import SpinsysSummary from './SummaryArea/SpinsysSummary'
import PulseseqSummary from './SummaryArea/PulseseqSummary'
import SettingsSummary from './SummaryArea/SettingsSummary'

export default {
  name: 'summary-area',
  components: {
    SpinsysSummary,
    PulseseqSummary,
    SettingsSummary
  }
}
</script>

<style scoped>
  #input-summary {
    height: 100%;
  }

  .summary-item {
    margin: 4px 0;
  }

  .col {
    padding: 1px;
  }
</style>
