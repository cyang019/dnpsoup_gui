<template>
  <div v-if="!adding" 
    id='add-section'
    @click="adding=true"
    class="d-flex flex-row"
  >
    <btn-add-vertical>
    </btn-add-vertical>
  </div>
  <div v-else id='add-section'>
    <edit-section 
      v-bind:section="defaultSection"
      v-bind:purpose="'add'"
      v-on:add-section-finish="adding=false"
    >
    </edit-section>
  </div>
</template>

<script>
import EditSection from './EditSection.vue'
import BtnAddVertical from '../../common/BtnAddVertical.vue'

export default {
  name: 'add-section',
  components: {
    EditSection,
    BtnAddVertical
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
