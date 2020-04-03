<template>
  <div v-if="!adding"
    class="d-flex flex-row"
    @click="adding=true"
  >
    <btn-add-vertical></btn-add-vertical>
  </div>
  <div v-else>
    <button @click="adding=false">click me</button>
  </div>
</template>

<script>
import BtnAddVertical from '../../common/BtnAddVertical.vue'

export default {
  name: 'add-sub-sequence',
  components: {
    BtnAddVertical
  },
  data () {
    return {
      adding: false
    }
  }
}
</script>
