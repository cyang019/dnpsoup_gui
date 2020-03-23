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
            <input type='number' id='x' placeholder=0.0>
          </div>
          
          <div class='col-form-label'>
            <label for='y' class='col-form-label'>y:</label>
            <input type='number' id='y' placeholder=0.0>
          </div>
          <div class='col-form-label'>
            <label for='z' class='col-form-label'>z:</label>
            <input type='number' id='z' placeholder=0.0>
          </div>
        </div>
        <div class='form-row'>
          <div class='col-auto'>
            <label for='spin-type' class='col-form-label'>Spin:</label>
            <select name='spin' id='spin-type' class='col-xs-2'>
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
            <input type='number' id='t1' placeholder=10.0 min=0.0>
          </div>
          <div class='col-auto'>
            <label for='t2' class='col-form-label'>T2:</label>
            <input type='number' id='t2' placeholder=1.0e-3 min=0.0>
          </div>
          <div class='col-auto'>
            <input type='submit' value='Add' class='btn btn-primary btn-sm'>
          </div>       
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
        t1: Infinity,
        t2: Infinity
      }
    }
  },
  methods: {
    onSubmit (e) {
      this.adding = false
    }
  }
}
</script>

<style scoped>
  #addspin-form {
    font-size: 0.8rem;
    border: 1px solid #eee;
  }
</style>