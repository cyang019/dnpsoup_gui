<template>
  <div id='edit-spin' class="card">
    <div class="card-body">
      <div class="card-title">
        [{{spin.id}}] {{spin.spinType}}
      </div>
      <div class="d-flex flex-column">
        <small v-if="coordError.length > 0" class="text-danger">{{coordError}}</small>
        <div class="form-group mb-0">
          <label class="col-form-label">x</label>
          <input class="col-md-3" 
            type="number" step="any" v-model="tempSpin.x">
          <label class="col-form-label">y</label>
          <input class="col-md-3" 
            type="number" step="any" v-model="tempSpin.y">
          <label class="col-form-label">z</label>
          <input class="col-md-3" 
            type="number" step="any" v-model="tempSpin.z">
        </div>
        <small v-if="t1Error.length > 0" class="text-danger">{{t1Error}}</small>
        <small v-if="t2Error.length > 0" class="text-danger">{{t2Error}}</small>
        <div class="form-group mb-0">
          <label class="col-form-label">t1</label>
          <input class="col-md-3"
            type="number" step="any" v-model="tempSpin.t1">
          <label class="col-form-label">t2</label>
          <input class="col-md-3"
            type="number" step="any" v-model="tempSpin.t2">
        </div>
        <div class="d-flex flex-row justify-content-end">
          <div class="btn btn-light" @click="okClicked">
            <span>
              <i class="fas fa-check text-success"></i>
              OK
            </span>
          </div>
          <div class="btn btn-light" @click="cancelClicked">
            <span>
              <i class="fas fa-ban text-danger"></i>
              Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'edit-spin',
  props: ['spin'],
  computed: {
    ...mapState('spinsys', ['spins'])
  },
  data () {
    return {
      tempSpin: this.copySpin(),
      t1Error: '',
      t2Error: '',
      coordError: ''
    }
  },
  methods: {
    ...mapActions('spinsys', ['updateSpin']),
    copySpin () {
      let result = Object.assign({}, this.spin)
      return result
    },
    validate () {
      let success = true
      // validate coordinate
      for (let existSpin of this.spins) {
        if (existSpin.id !== this.tempSpin.id) {
          let diffX = existSpin.x - this.tempSpin.x
          let diffY = existSpin.y - this.tempSpin.y
          let diffZ = existSpin.z - this.tempSpin.z
          let squareSum = diffX * diffX + diffY * diffY + diffZ * diffZ
          if (Math.sqrt(squareSum) < 0.2) {
            this.coordError = 'Spin ' + existSpin.id + ' and ' + this.tempSpin.id + ' are too close (< 0.2 Anstrom).'
            success = false
            break
          }
        }
      }
      // validate t1
      if (parseFloat(this.tempSpin.t1 < 1.0e-14)) {
        this.t1Error = 't1 cannot be zero.'
        success = false
      }
      // validate t2
      if (parseFloat(this.tempSpin.t2 < 1.0e-14)) {
        this.t2Error = 't2 cannot be zero.'
        success = false
      }
      return success
    },
    okClicked () {
      let success = this.validate()
      if (!success) return
      this.updateSpin(this.tempSpin)
      this.$emit('edit-spin-finish', true)
    },
    cancelClicked () {
      this.$emit('edit-spin-finish', false)
    }
  }
}
</script>

<style scoped>
.card-title {
  font-size: 0.9rem;
  height: 1.4rem;
  margin: 1px 2px;
  background-color: #efefef;
}

.card-body {
  font-size: 0.9rem;
  margin: 1px 2px;
  padding: 0;
}
</style>
