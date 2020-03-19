<template>
  <div id='input-summary'>
    <spinsys-summary/>
    <pulseseq-summary/>
    <settings-summary/>
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

</style>
