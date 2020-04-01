<template>
  <div>
    <add-emr/>
    <div class="d-flex flex-wrap">
      <emr-brief
        v-for="emr in emrs"
        :key="emr.name"
        :emr="emr"
      >
      </emr-brief>
    </div>
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