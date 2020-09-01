<template>
  <div>
    <div v-if="!adding" class="btn btn-primary btn-sm" @click="adding=true">
      <i class="fas fa-plus"></i>
    </div>
    <div v-else class="d-flex flex-row mt-1">
      <div v-for="(spin, index) in spins" :key="index">
        <check-box-spin-id
          v-bind:spinId="spin.id"
          v-on:spin-chosen-for-group="addSpin($event)"
          v-on:spin-unselect-for-group="removeSpin($event)"
        />
      </div>
      <div class="btn btn-primary btn-sm mr-1" @click="okClicked">
        <span>OK</span>
      </div>
      <div @click="adding=false" class="btn btn-primary btn-sm">
        <span>Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CheckBoxSpinId from './CheckboxSpinId'

export default {
  name: 'add-spin-group',
  components: {
    CheckBoxSpinId
  },
  data () {
    return {
      adding: false,
      chosenSpinIds: []
    }
  },
  computed: {
    ...mapState('spinsys', ['spins'])
  },
  methods: {
    ...mapActions('spinsys', ['addSpinGroup']),
    okClicked () {
      if (this.chosenSpinIds.length > 0) {
        this.addSpinGroup(this.chosenSpinIds)
        this.chosenSpinIds = []
      }
      this.adding = false
    },
    addSpin (spinId) {
      this.chosenSpinIds.push(spinId)
    },
    removeSpin (spinId) {
      var index = this.chosenSpinIds.indexOf(spinId)
      if (index === -1) {
        return
      }
      this.chosenSpinIds.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>