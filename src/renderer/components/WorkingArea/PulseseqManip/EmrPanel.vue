<template>
  <div class="d-flex flex-row">
    <emr-brief
      v-for="(emr, index) in emrs"
      :key="index"
      :emr="emr"
      :emrIndex="index"
    >
    </emr-brief>
    <add-emr/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddEmr from './EmrPanel/AddEmr'
import EmrBrief from './EmrPanel/EmrBrief'

export default {
  name: 'emr-panel',
  components: {
    AddEmr,
    EmrBrief
  },
  computed: {
    ...mapState('pulseseq', ['emrs'])
  }
}
</script>

<style scoped>

</style>