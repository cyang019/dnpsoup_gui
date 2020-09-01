<template>
  <div class="card card-body m-1 p-1 d-flex flex-column">
    <div v-for="(spinId, index) in spinIds" :key="index"
      class="badge badge-pill badge-secondary mb-1"
    >
      [{{spinId}}] {{getSpinType(spinId)}}
    </div>
    <div class="d-flex flex-row-reverse">
      <div class="btn btn-sm">
        <i class="far fa-trash-alt" @click="removeSpinGroup(idx)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'spin-group',
  props: ['spinIds', 'idx'],
  computed: {
    ...mapState('spinsys', ['spins'])
  },
  methods: {
    ...mapActions('spinsys', ['removeSpinGroup']),
    getSpinType (spinId) {
      const spin = this.spins.find(spin => spin.id === spinId)
      return spin.spinType
    }
  }
}
</script>

<style scoped>

</style>