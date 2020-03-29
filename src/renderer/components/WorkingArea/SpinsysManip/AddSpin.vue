<template>
  <div id='add-spin'>
    <div v-if='!adding'>
      <button class='btn btn-primary btn-sm' @click='adding=true'>
        <i class='far fa-plus-square'></i>
        <span> Add Spin</span>
      </button>
    </div>
    <div v-if='adding'>
      <form id='addspin-form' 
        @submit.prevent='onSubmit'
        @cancel.prevent='onCancel'
        class='border border-primary'>
        <div class="form-row">
          <label for='x' class='col-form-label'>x:</label>
          <input type='number' id='x' placeholder=0.0 
            class='col-sm-2'
            v-model.number='spin.x' step="any">
          <label for='y' class='col-form-label'>y:</label>
          <input type='number' id='y' placeholder=0.0 
            class='col-sm-2'
            v-model.number='spin.y' step="any">
          <label for='z' class='col-form-label'>z:</label>
          <input type='number' id='z' placeholder=0.0 
            class='col-sm-2'
            v-model.number='spin.z' step="any">
        </div>

        <div class='form-row'>
          <div class='col-auto'>
            <label for='spin-type' class='col-form-label'>Spin:</label>
            <select name='spin' id='spin-type' class='col-xs-2' v-model='spin.spinType'>
              <option value=''>--</option>
              <option value='e'>e</option>
              <option value='H1'>H</option>
              <option value='D2'>D</option>
              <option value='C13'>C13</option>
              <option value='N15'>N15</option>
            </select>
          </div>
          
          <label for='t1' class='col-form-label'>T1:</label>
          <input type='number' id='t1' placeholder='10.0' min='0.0' 
            class='col-sm-2'
            v-model.number='spin.t1' step="any">
          <label for='t2' class='col-form-label'>T2:</label>
          <input type='number' id='t2' placeholder='1.0e-3' min='0.0' 
            class='col-sm-2'
            v-model.number='spin.t2' step="any"> 
        </div>

        <div v-if="spin.spinType=='e'">
          <div class="form-row">
            <label for='gxx' class='col-form-label'>g<sub>xx</sub></label>
            <input 
              type='number' 
              id='gxx' 
              placeholder='2.003' 
              v-model.number='tensor.x' 
              class="col-sm-2 col-lg-1"
              step="any">
            <label for='gyy' class='col-form-label'>g<sub>yy</sub></label>
            <input 
              type='number' 
              id='gyy' 
              placeholder='2.003' 
              v-model.number='tensor.y' 
              class="col-sm-2"
              step="any">
            <label for='gzz' class='col-form-label'>g<sub>zz</sub></label>
            <input 
              type='number' 
              id='gzz' 
              placeholder='2.003' 
              v-model.number='tensor.z' 
              class="col-sm-2"
              step="any">
          </div>
        </div>
        <div v-else>
          <div class='form-row'>
            <label for='csaxx' class='col-form-label'>csa<sub>xx</sub></label>
            <input 
              type='number' 
              id='csaxx' placeholder='0.0' 
              v-model.number='tensor.x'
              class="col-sm-2"
              step="any">
            <label for='csayy' class='col-form-label'>csa<sub>yy</sub></label>
            <input 
              type='number' 
              id='csayy' 
              placeholder='0.0' 
              v-model.number='tensor.y' 
              class="col-sm-2"
              step="any">
            <label for='csazz' class='col-form-label'>csa<sub>zz</sub></label>
            <input 
              type='number' 
              id='csazz' 
              placeholder='0.0' 
              v-model.number='tensor.z' 
              class="col-sm-2"
              step="any">
          </div>
        </div>

        <div class="form-row">
          <div class="col-auto">
            <small class="form-text text-muted">Euler Angle:</small>
          </div>

          <label for="euler-alpha" class="col-form-label">alpha</label>
          <input 
            type="number" 
            id="euler-alpha" 
            v-model.number="euler.alpha" 
            class="col-sm-2"
            step="any">

          <label for="euler-beta" class="col-form-label">beta</label>
          <input 
            type="number" id="euler-beta" v-model.number="euler.beta"
            class="col-sm-2"
            step="any">

          <label for="euler-gamma" class="col-form-label">gamma</label>
          <input 
            type="number" id="euler-gamma" v-model.number="euler.gamma"
            class="col-sm-2"
            step="any">
        </div>

        <div class='form-row'>
          <div class='col-3'>
            <input type='submit' value='Add' class='btn btn-primary btn-sm'>
          </div>
          <div class="col-3">
            <input type="cancel" value='Cancel'
              class="btn btn-light btn-sm"
              @click="onCancel"
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { minValue, integer } from 'vuelidate/lib/validators'

export default {
  name: 'add-spin',
  data () {
    return {
      adding: false,
      spin: {
        id: 0,
        x: 0.0,
        y: 0.0,
        z: 0.0,
        spinType: '',
        t1: 100.0,
        t2: 10.0
      },
      tensor: { // chemical shift anisotropy or g-tensor
        x: 0.0,
        y: 0.0,
        z: 0.0
      },
      euler: { // in radius
        alpha: 0.0,
        beta: 0.0,
        gamma: 0.0
      }
    }
  },
  validations: {
    spin: {
      id: integer,
      t1: minValue(0.0),
      t2: minValue(0.0)
    }
  },
  computed: {
    ...mapState('spinsys', ['spins'])
  },
  methods: {
    ...mapActions('spinsys', [
      'addSpin', 'addOneSpinInteraction', 'addTwoSpinInteraction',
      'incrementSpinId', 'incrementInteractionId']),
    ...mapGetters('spinsys', ['getSpinId', 'getInteractionId']),

    deriveDefaultInteractionName (spin1, spin2) {
      if (spin1.spinType !== spin2.spinType && [spin1.spinType, spin2.spinType].includes('e')) {
        return 'hyperfine'
      } else {
        return 'dipole'
      }
    },

    onSubmit (e) {
      this.adding = false
      // currentId incremented after addSpin
      let spin = Object.assign({}, this.spin)
      spin['id'] = this.getSpinId()
      if (spin.id === -1 || spin.spinType === '') return
      this.addSpin(spin)
      this.incrementSpinId()

      this.addOneSpinInteraction({
        'spinId': parseInt(spin['id']),
        'tensor': Object.assign({}, this.tensor),
        'euler': Object.assign({}, this.euler)
      })
      for (const spin2 of this.spins) {
        if (spin2.id !== spin.id) {
          if (spin2.id > spin.id) {
            this.addTwoSpinInteraction({
              'name': this.deriveDefaultInteractionName(spin, spin2),
              'spinId1': parseInt(spin.id),
              'spinId2': parseInt(spin2.id)
            })
          } else {
            this.addTwoSpinInteraction({
              'name': this.deriveDefaultInteractionName(spin2, spin),
              'spinId1': parseInt(spin2.id),
              'spinId2': parseInt(spin.id)
            })
          }
        }
      }

      // reset other info
      this.resetPhysicalProperties()
    },
    resetPhysicalProperties () {
      this.spin.x = 0.0
      this.spin.y = 0.0
      this.spin.z = 0.0
      this.spinType = ''
      this.t1 = 100
      this.t2 = 10
      this.tensor.x = 0.0
      this.tensor.y = 0.0
      this.tensor.z = 0.0
      this.euler.alpha = 0.0
      this.euler.beta = 0.0
      this.euler.gamma = 0.0
    },
    onCancel (e) {
      this.adding = false
      this.resetPhysicalProperties()
    }
  }
}
</script>

<style scoped>
  #addspin-form {
    font-size: 0.8rem;
    padding: 1px;
  }
</style>
