<template>
  <div id="spin-brief">
    <div
      v-if="!showDetails"
      class='brief rounded align-middle text-center border border-primary text-primary'
      @click="showDetails=true"
    >
      <span class='p-1'>[{{spin.id}}] {{spin.spinType}}</span>
    </div>
    <div v-else>
      <div v-if="!editing" class='border border-primary text-primary card'>
        <div class="card-body">
          <div class="card-title" @click="showDetails=false">
            [{{spin.id}}] {{spin.spinType}}
          </div>
          <div class="d-flex flex-column">
            <div class="p">x: {{spin.x}}, y: {{spin.y}}, z: {{spin.z}}</div>
            <div class="p">t1: {{spin.t1}}, t2: {{spin.t2}}</div>
            <div class="d-flex flex-row justify-content-end">
              <div class="btn btn-light btn-sm"
                @click="editClicked"
              >
                <span class="text-secondary"><i class='fas fa-pen'></i></span>
              </div>
              <div class="btn btn-light btn-sm"
                @click="removeSpin(spin.id)"
              >
                <span class="text-secondary"><i class='far fa-trash-alt'></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <edit-spin
          :spin="spin"
          v-on:edit-spin-finish="editing=false"
        ></edit-spin>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EditSpin from './EditSpin'

export default {
  name: 'spin-brief',
  components: {
    EditSpin
  },
  props: ['spin'],
  data () {
    return {
      showDetails: false,
      editing: false
    }
  },
  methods: {
    ...mapActions('spinsys', ['removeSpin']),
    editClicked () {
      this.editing = true
    }
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

.card-title {
  font-size: 0.9rem;
  height: 1.4rem;
  margin: 1px 2px;
  background-color: #efefef;
}

.card-body {
  font-size: 0.9rem;
  margin: 1px 2px;
  padding: 2px;
}
</style>
