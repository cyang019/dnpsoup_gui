<template>
  <div>
    <small class="text-muted">Settings Summary</small>
    <div class="d-flex flex-column">
      <span v-if="taskName !== 'Default'" class="p">
        Task: {{taskName}}
      </span>
      <span v-if="eulerOption==='zcw'" class="p">
        ZCW {{eulerZcw}}
      </span>
      <span v-if="eulerOption==='eulers'" class="p">
        {{eulers.length}} customized angles
      </span>
      <span v-if="mas > 0">
        MAS {{mas}} Hz
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'settings-summary',
  computed: {
    ...mapState('SimSettings', {
      taskName: state => state.simulation.task.name,
      eulerOption: state => state.sample.eulerOption,
      eulerZcw: state => state.sample.eulerScheme.zcw,
      eulers: state => state.sample.eulers,
      mas: state => state.hardware.probe.masFrequency
    })
  }
}
</script>

<style scoped>

</style>