<template>
  <div v-if="!adding" id='add-section' class="btn btn-light" @click="adding=true">
    <i class="fas fa-plus"></i>
  </div>
  <div v-else id='add-section'>
    <edit-section 
      v-bind:section="defaultSection"
      v-bind:purpose="'add'"
      v-on:add-finish="adding=false"
    >
    </edit-section>
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
      adding: false,
      defaultSection: {
        name: '',
        type: 'Delay',
        size: 0,
        names: [],
        params: {}
      }
    }
  }
}
</script>

<style scoped>

</style>
