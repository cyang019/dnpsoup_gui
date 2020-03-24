<template>
  <div id='add-spin'>
    <div v-if='!adding'>
      <button class='btn btn-primary btn-sm' @click='adding=true'>
        <i class='far fa-plus-square'></i>
        <span> Add Spin</span>
      </button>
    </div>
    <div v-if='adding'>
      <form id='addspin-form' @submit.prevent='onSubmit'>
        <div class="form-row">
          <div class='col-form-label'>
            <label for='x' class='col-form-label'>x:</label>
            <input type='number' id='x' placeholder=0.0 v-model='spin.x'>
          </div>
          
          <div class='col-form-label'>
            <label for='y' class='col-form-label'>y:</label>
            <input type='number' id='y' placeholder=0.0 v-model='spin.y'>
          </div>
          <div class='col-form-label'>
            <label for='z' class='col-form-label'>z:</label>
            <input type='number' id='z' placeholder=0.0 v-model='spin.z'>
          </div>
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
          
          <div class='col-auto'>
            <label for='t1' class='col-form-label'>T1:</label>
            <input type='number' id='t1' placeholder='10.0' min='0.0' v-model='spin.t1'>
          </div>
          <div class='col-auto'>
            <label for='t2' class='col-form-label'>T2:</label>
            <input type='number' id='t2' placeholder='1.0e-3' min='0.0' v-model='spin.t2'>
          </div>       
        </div>

        <div v-if="spin.spinType=='e'">
          <div class="form-row">
            <div class='col-auto'>
              <label for='gxx' class='col-form-label'>g<sub>xx</sub></label>
              <input type='number' id='gxx' placeholder='2.003' v-model='tensor.x'>
            </div>
            <div class='col-auto'>
              <label for='gyy' class='col-form-label'>g<sub>yy</sub></label>
              <input type='number' id='gyy' placeholder='2.003' v-model='tensor.y'>
            </div>
            <div class='col-auto'>
              <label for='gzz' class='col-form-label'>g<sub>zz</sub></label>
              <input type='number' id='gzz' placeholder='2.003' v-model='tensor.z'>
            </div>
          </div>
        </div>
        <div v-else>
          <div class='form-row'>
            <div class='col-auto'>
              <label for='csaxx' class='col-form-label'>csa<sub>xx</sub></label>
              <input type='number' id='csaxx' placeholder='0.0' v-model='tensor.x'>
            </div>
            <div class='col-auto'>
              <label for='csayy' class='col-form-label'>csa<sub>yy</sub></label>
              <input type='number' id='csayy' placeholder='0.0' v-model='tensor.y'>
            </div>
            <div class='col-auto'>
              <label for='csazz' class='col-form-label'>csa<sub>zz</sub></label>
              <input type='number' id='csazz' placeholder='0.0' v-model='tensor.z'>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="col-auto">
            <small class="form-text text-muted">Euler Angle:</small>
          </div>
          <div class="col-auto">
            <label for="euler-alpha" class="col-form-label">alpha</label>
            <input type="number" id="euler-alpha" v-model="euler.alpha">
          </div>
          <div class="col-auto">
            <label for="euler-beta" class="col-form-label">beta</label>
            <input type="number" id="euler-beta" v-model="euler.beta">
          </div>
          <div class="col-auto">
            <label for="euler-gamma" class="col-form-label">gamma</label>
            <input type="number" id="euler-gamma" v-model="euler.gamma">
          </div>
        </div>

        <div class='form-row'>
          <div class='col-auto'>
            <input type='submit' value='Add' class='btn btn-primary btn-sm'>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'add-spin',
  data () {
    return {
      adding: false,
      spin: {
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
      },
      currentId: 1
    }
  },
  methods: {
    ...mapActions('spinsys', ['addSpin', 'addInteraction']),

    genInteraction () {
      const name = (this.spin.spinType === 'e') ? 'shielding' : 'csa'
      return {
        name: name,
        entries: {
          euler: {
            alpha: this.euler.alpha,
            beta: this.euler.beta,
            gamma: this.euler.gamma
          },
          x: this.tensor.x,
          y: this.tensor.y,
          z: this.tensor.z
        }
      }
    },

    onSubmit (e) {
      this.adding = false
      // currentId incremented after addSpin
      const payload = [
        this.currentId, this.spin
      ]
      this.addSpin(payload)

      var observable = this.genInteraction()
      observable['entries']['id'] = this.currentId.toString()
      this.addInteraction(observable)
      this.currentId++
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