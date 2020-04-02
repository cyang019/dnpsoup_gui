<template>
  <div v-if="!adding" id='add-section' class="btn btn-light" @click="adding=true">
    <i class="fas fa-plus"></i>
  </div>
  <div v-else id='add-section'>
    <edit-section/>
  </div>
</template>

<script>
import EditSection from './EditSection.vue'

export default {
  name: 'add-section',
  components: {
    EditSection
  },
  data () {
    return {
      adding: false
    }
  }
}
</script>

<style scoped>

</style>
