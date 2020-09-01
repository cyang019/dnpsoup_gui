<template>
  <div class="border border-rounded mx-1 px-1 pb-1">
    <small class="text-secondary">Spin Groups</small>
    <div class="d-flex flex-wrap">
      <div v-for="(spinIds, index) in spinGroups" :key="index">
        <spin-group 
          v-bind:spin-ids="spinIds"
          v-bind:idx="index"
        />
      </div>
      <add-spin-group/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddSpinGroup from './SpinGroupsManip/AddSpinGroup'
import SpinGroup from './SpinGroupsManip/SpinGroup'

export default {
  name: 'spin-groups',
  components: {
    AddSpinGroup,
    SpinGroup
  },
  computed: {
    ...mapState('spinsys', ['spinGroups'])
  },
  methods: {

  }
}
</script>

<style scoped>

</style>