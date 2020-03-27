<template>
  <div id="spin-brief">
    <div
      v-if="!showDetails"
      class='brief rounded align-middle text-center border border-primary text-primary'
      @click="showDetails=true"
    >
      <span class='p-1'>[{{spin.id}}] {{spin.spinType}}</span>
    </div>
    <div v-else
      class='details rounded align-middle text-center border border-primary text-primary'
    >
      <div class="container">
        <div class="col">
          <div class="row p-1 brief-header text-left" @click="showDetails=false">
            [{{spin.id}}] {{spin.spinType}}
          </div>
          <div class="row p-1">x: {{spin.x}}, y: {{spin.y}}, z: {{spin.z}}</div>
          <div class="row p-1">t1: {{spin.t1}}, t2: {{spin.t2}}</div>
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4 p-1 align-middle">
              <span @click="removeSpin(spin.id)">
                <i class="far fa-trash-alt delete"></i>
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['spin'],
  data () {
    return {
      showDetails: false
    }
  },
  methods: {
    ...mapActions('spinsys', ['removeSpin'])
  }
}
</script>

<style scoped>
.delete {
  cursor: pointer;
}

.brief {
  font-size: 0.8rem;
  height: 1.4rem;
  width: 4rem;
  margin: 1px 2px;
}

.brief-header {
  background-color: #efefef;
}

.details {
  font-size: 0.8rem;
  margin: 1px 2px;
  width: 8rem;
}

.container {
  padding: 1px;
}

.col {
  margin: 0;
  padding: 0 1px;
}
.row {
  margin: 0;
  padding: 0;
}
</style>
