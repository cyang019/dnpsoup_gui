<template>
  <div v-if="!editing">

  </div>
  <div v-else>

  </div>
</template>

<script>
import EditSection from './EditSection.vue'

export default {
  name: 'section-brief',
  components: {
    EditSection
  },
  props: ['section'],
  data () {
    return {
      editing: false,
      tempSection: {
        name: '',
        type: 'Delay',
        size: 0,
        names: [],
        span: 0,
        spinType: '',
        phase0: {

        },
        params: {}
      }
    }
  }
}
</script>

<style scoped>

</style>
