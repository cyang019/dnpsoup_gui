<template>
  <div id='add-interaction'>
    <div v-if="!adding">
      <div v-if="spins.length < 1">
        <button 
        class='btn btn-secondary btn-sm disabled'
        >
          <i class='far fa-plus-square'></i>
          <span> Add Interaction</span>
        </button>
      </div>
      <div v-else>
        <button 
        class='btn btn-secondary btn-sm'
        @click="adding=true"
        >
          <i class='far fa-plus-square'></i>
          <span> Add Interaction</span>
        </button>
      </div>
    </div>
    <div v-else>
      <form id='addinteraction-form' 
        @submit.prevent='onSubmit'
        class='border border-primary'>
        <div class="d-flex flex-row">
          <div class="btn-group btn-group-sm btn-group-toggle" role="group">
            <label class="btn btn-light btn-sm"
              :class="{'active': category === 'oneSpin'}"
            >
              <input type="radio" name="category" id="option1" 
                value='oneSpin' 
                v-model="category"
              >
              One Spin
            </label>
            <label v-if="spins.length > 1" class="btn btn-light btn-sm"
              :class="{'active': category === 'twoSpin'}"
            >
              <input type="radio" name="category" id="option2" 
                value='twoSpin' 
                v-model="category"
                :checked="spins.length > 1"
              >
              Two Spins
            </label>
            <div v-else>
              <label class="btn btn-light btn-sm disabled"
              >
                Two Spins
              </label>
            </div>
          </div>
        </div>
        <div v-if="category === 'oneSpin'" class="d-flex flex-column">
          <div class="form-group mb-0">
            <label for='interaction-name' class='col-form-label'>Name:</label>
            <select name='name' id='interaction-name'
              v-model='interaction.name'>
              <option value=''>--</option>
              <option v-for="option in oneSpinOptions" :value="option" :key=option
              >
                {{option}}
              </option>
            </select>
          </div>
          <small v-if="spinId1Error.length > 0" class="text-danger">
            {{spinId1Error}}
          </small>
          <div class="form-group mb-0">
            <label for='spin-id' class='col-form-label'>Spin Id:</label>
            <select name='spin-id' id='spin-id'
              v-model="interaction.id1">
              <option value=''>--</option>
              <option v-for="spin in spins" :value="spin.id" :key=spin.id>
                spin [{{spin.id}}]
              </option>
            </select>
          </div>
          <div v-if="interaction.name === 'Shielding'">
            <div class="form-group mb-0" >
              <label for='gxx' class='col-form-label'>g<sub>xx</sub></label>
              <input 
                type='number'
                id='gxx'
                v-model.number='interaction.tensor.xx' 
                class="col-md-3"
                step="any">
              <label for='gyy' class='col-form-label'>g<sub>yy</sub></label>
              <input 
                type='number'
                id='gyy'
                v-model.number='interaction.tensor.yy' 
                class="col-md-3"
                step="any">
              <label for='gzz' class='col-form-label'>g<sub>zz</sub></label>
              <input 
                type='number'
                id='gzz'
                v-model.number='interaction.tensor.zz' 
                class="col-md-3"
                step="any">
            </div>
          </div>
          <div v-else>
            <div class="form-group mb-0">
              <label for='csaxx' class='col-form-label'>csa<sub>xx</sub></label>
              <input 
                type='number' 
                id='csaxx' placeholder='0.0' 
                v-model.number='interaction.tensor.xx'
                class="col-md-2"
                step="any">
              <label for='csayy' class='col-form-label'>csa<sub>yy</sub></label>
              <input 
                type='number' 
                id='csayy' 
                placeholder='0.0' 
                v-model.number='interaction.tensor.yy' 
                class="col-md-2"
                step="any">
              <label for='csazz' class='col-form-label'>csa<sub>zz</sub></label>
              <input 
                type='number' 
                id='csazz' 
                placeholder='0.0' 
                v-model.number='interaction.tensor.zz' 
                class="col-md-2"
                step="any">
            </div>
          </div>
          <div class="form-group mb-0">
            <label class="col-form-label">Euler Angle: </label>

            <label for="euler-alpha" class="col-form-label">{{decode(msgAlpha)}}</label>
            <input 
              type="number" 
              id="euler-alpha" 
              v-model.number="interaction.euler.alpha" 
              class="col-md-2"
              step="any">

            <label for="euler-beta" class="col-form-label">{{decode(msgBeta)}}</label>
            <input 
              type="number" id="euler-beta" v-model.number="interaction.euler.beta"
              class="col-md-2"
              step="any">

            <label for="euler-gamma" class="col-form-label">{{decode(msgGamma)}}</label>
            <input 
              type="number" id="euler-gamma" v-model.number="interaction.euler.gamma"
              class="col-md-2"
              step="any">
          </div>
        </div>
        <div v-else>
          <!-- 2 spins -->
          <div class="form-group mb-0">
            <label for='interaction-name' class='col-form-label'>Name:</label>
            <select name='name' id='interaction-name'
              v-model='interaction.name'>
              <option value=''>--</option>
              <option v-for="option in twoSpinOptions" :value='option' :key=option>
                {{option}}
              </option>
            </select>
          </div>
          <small v-if="spinId1Error.length > 0" class="text-danger">
            {{spinId1Error}}
          </small>
          <div class="form-group mb-0">
            <label for='spin-id1' class='col-form-label'>Spin Id1:</label>
            <select name='spin-id1' id='spin-id1'
              v-model='interaction.id1'>
              <option value=''>--</option>
              <option v-for="spin in spins" :value="spin.id" :key=spin.id>
                spin [{{spin.id}}]
              </option>
            </select>
          </div>
          <small v-if="spinId2Error.length > 0" class="text-danger">
            {{spinId2Error}}
          </small>
          <div class="form-group mb-0">
            <label for='spin-id2' class='col-form-label'>Spin Id2:</label>
            <select name='spin-id2' id='spin-id2'
              v-model='interaction.id2'>
              <option value=''>--</option>
              <option v-for="spin in spins.filter(spin => spin.id !== interaction.id1)" 
                :value="spin.id" 
                :key=spin.id
              >
                spin [{{spin.id}}]
              </option>
            </select>
          </div>
          <div v-if="interaction.name === 'Scalar'" class="form-group mb-0">
            <label for="scalar-value" class="col-form-label">Value :</label>
            <input 
              type="number" id="scalar-value" v-model.number="interaction.value"
              class="col-sm-4"
              step="any">
            <label for="scalar-value" class="col-form-label">Hz</label>
          </div>
        </div>
        
        <div class='form-group mb-0'>
          <input type='submit' value='Add' class='btn btn-primary btn-sm col-4 btn-submit'>
          <input type="cancel" value='Cancel'
            class="btn btn-light btn-sm col-4 btn-submit"
            @click="onCancel"
          >
        </div>
      </form>
    </div>
    
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { decode } from 'he'

export default {
  name: 'add-interaction',
  data () {
    return {
      adding: false,
      category: 'oneSpin',
      interaction: {
        id1: -1,
        id2: -1,
        name: '',
        value: 0.0,
        tensor: {
          xx: 0.0,
          yy: 0.0,
          zz: 0.0
        },
        euler: {
          alpha: 0.0,
          beta: 0.0,
          gamma: 0.0
        }
      },
      msgAlpha: '&#x3B1;',
      msgBeta: '&#x3B2;',
      msgGamma: '&#x3B3;',

      oneSpinOptions: [
        'Csa',
        'Shielding'
      ],
      twoSpinOptions: [
        'Scalar',
        'Dipolar',
        'Hyperfine'
      ],
      spinId1Error: '',
      spinId2Error: ''
    }
  },
  computed: {
    ...mapState('spinsys', ['spins', 'interactions'])
  },
  methods: {
    ...mapActions('spinsys', [
      'addOneSpinInteraction', 'addTwoSpinInteraction']),

    decode (str) {
      return decode(str)
    },
    validate () {
      let success = true
      if (this.category === 'oneSpin') {
        if (this.interaction.id1 < 0) {
          this.spinId1Error = 'Need to set a spin id.'
          success = false
        }
      } else if (this.category === 'twoSpin') {
        if (this.interaction.id1 < 0) {
          this.spinId1Error = 'Need to set spin id 1.'
          success = false
        }
        if (this.interaction.id2 < 0) {
          this.spinId2Error = 'Need to set spin id 2.'
          success = false
        }
      }
      return success
    },
    onSubmit (e) {
      let success = this.validate()
      if (!success) return
      this.adding = false

      switch (this.interaction.name) {
        case 'Csa': case 'Shielding':
          this.addOneSpinInteraction({
            'spinId': parseInt(this.interaction.id1),
            'tensor': {
              x: parseFloat(this.interaction.tensor.xx),
              y: parseFloat(this.interaction.tensor.yy),
              z: parseFloat(this.interaction.tensor.zz)
            },
            'euler': Object.assign({}, this.interaction.euler)
          })
          break
        case 'Dipolar':
          this.addTwoSpinInteraction({
            'name': 'dipole',
            'spinId1': parseInt(this.interaction.id1),
            'spinId2': parseInt(this.interaction.id2)
          })
          break
        case 'Hyperfine':
          this.addTwoSpinInteraction({
            'name': 'hyperfine',
            'spinId1': parseInt(this.interaction.id1),
            'spinId2': parseInt(this.interaction.id2)
          })
          break
        case 'Scalar':
          this.addTwoSpinInteraction({
            'name': this.interaction.name.slice(0, this.interaction.name.length),
            'spinId1': parseInt(this.interaction.id1),
            'spinId2': parseInt(this.interaction.id2),
            'value': parseFloat(this.interaction.value)
          })
          break
        default:
          console.log('unknown interaction: ' + this.interaction.name)
          break
      }
      this.resetInteraction()
    },
    resetInteraction () {
      this.category = 'oneSpin'
      this.interaction.id1 = -1
      this.interaction.id2 = -1
      this.interaction.name = ''
      this.interaction.value = 0.0
      this.interaction.tensor.xx = 0.0
      this.interaction.tensor.yy = 0.0
      this.interaction.tensor.zz = 0.0
      this.interaction.euler.alpha = 0.0
      this.interaction.euler.beta = 0.0
      this.interaction.euler.gamma = 0.0
    },
    onCancel (e) {
      this.adding = false
      this.resetInteraction()
    }
  }
}
</script>

<style scoped>
  #addinteraction-form {
    font-size: 0.8rem;
    margin: 0px;
    padding: 1px;
  }

  .btn-submit {
    margin: 1px 4px;
  }
</style>
