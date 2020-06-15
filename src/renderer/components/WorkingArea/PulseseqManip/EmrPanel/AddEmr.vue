<template>
  <div v-if="!adding" @click="adding=true" class="d-flex flex-row">
    <btn-add-vertical></btn-add-vertical>
  </div>
  <div v-else>
    <edit-emr
      :emr="defaultEmr"
      :emrIndex="0"
      :purpose="'add'"
      v-on:edit-emr-finish="adding=false"
    >
    </edit-emr>
  </div>
</template>

<script>
import BtnAddVertical from '../../common/BtnAddVertical'
import EditEmr from './EditEmr'

export default {
  name: 'add-emr',
  components: {
    BtnAddVertical,
    EditEmr
  },
  data () {
    return {
      adding: false,
      defaultEmr: {
        name: '',
        channels: []
      }
    }
  }
}
</script>

<style scoped>

</style>
