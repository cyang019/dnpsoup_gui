<template>
  <div id="emr-brief">
    <div v-if="!editing" class="card rounded">
      <div class="card-body">
        <h6 class="card-title m-1">
          {{emr.name}}
        </h6>
        <div class="card-text text-muted">
          <div 
            class="d-flex flex-column"
            v-for="channel in emr.channels" :key="channel.spinType"
          >
            [{{channel.spinType}}] 
            {{decode(msgGamma)}}B1: {{channel.frequency}}Hz 
            Phase {{channel.phase}}{{decode(msgDegree)}}
          </div>
          <div class="container">
              <div class="row justify-content-right">
              <div class="col-6"></div>
              <div class="col-2 order-1 btn-emr" 
                @click="initEdit"
              >
                <i class='fas fa-pen'></i>
              </div>
              <div class="col-2 order-2 btn-emr" 
                @click="deleteEmrByName(emr.name)"
              >
                <i class='far fa-trash-alt'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p v-if="errors.length">
        <small v-for="error in errors" :key="error.id" class="text-danger">
          {{ error.msg }}
        </small>
      </p>
      <div class="card-body border border-primary">
        <input type="text" class="card-title m-1"
          v-model="tempEmr.name"
        >
        <div class="card-text text-muted">
          <div 
            class="d-flex flex-column"
            v-for="channel in tempEmr.channels" :key="channel.spinType"
          >
            <select 
              name="channel" id="channel"
              v-model='channel.spinType'
            >
              <option v-for="option in channelOptions" :value="option" :key="option">
                {{option}}
              </option>
            </select>

            <p>{{decode(msgGamma)}}B1: (Hz)</p>
            <input type="number" step="any" v-model.number="channel.frequency">
            <p>Phase in degree: </p>
            <input type="number" step="any" v-model.number="channel.phase">
          </div>
          <div class="container">
              <div class="row justify-content-right">
              <div class="col-6"></div>
              <div class="col-2 order-1 btn-emr"
                @click="submitEdit"
              >
                <i class='fas fa-check-circle'></i>
              </div>
              <div class="col-2 order-2 btn-emr"
                @click="editing=false"
              >
                <i class='fas fa-ban'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { decode } from 'he'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'emr-brief',
  props: ['emr'],
  computed: {
    ...mapState('pulseseq', ['channelOptions'])
  },
  data () {
    return {
      errors: [],
      errorId: 0,
      msgGamma: '&#x3B3;',
      msgDegree: '&#186;',

      editing: false,
      tempEmr: {
        name: '',
        channels: []
      }
    }
  },
  methods: {
    ...mapActions('pulseseq', ['deleteEmrByName', 'updateEmr']),
    resetTempEmr () {
      this.tempEmr.name = ''
      this.tempEmr.channels = []
    },
    validateEdit () {
      if (this.tempEmr.name.length === 0) {
        this.errors.push({
          id: parseInt(this.errorId++),
          msg: 'Name cannot be empty.'
        })
        return false
      } else if (this.errors.length > 0) {
        return false
      }
      return true
    },
    initEdit () {
      this.editing = true
      this.errors = []
      this.errorId = 0
      this.tempEmr.name = this.emr.name.slice(0, this.emr.name.length)
      this.tempEmr.channels = []
      for (const channel of this.emr.channels) {
        let tempChannel = Object.assign({}, channel)
        this.tempEmr.channels.push(tempChannel)
      }
    },
    submitEdit () {
      if (!this.validateEdit()) return

      let emrCommitted = {
        name: this.tempEmr.name.slice(0, this.tempEmr.name.length),
        channels: []
      }
      for (const channel of this.tempEmr.channels) {
        let channelCommitted = Object.assign({}, channel)
        emrCommitted.channels.push(channelCommitted)
      }
      if (this.emr.name !== emrCommitted.name) {
        this.deleteEmrByName(this.emr.name)
      }
      this.updateEmr(emrCommitted)
      this.resetTempEmr()
      this.editing = false
    },
    decode (str) {
      return decode(str)
    }
  }
}
</script>

<style scoped>
  .card-body {
    padding: 4px;
  }

  .card {
    margin: 1px;
  }

  .btn-emr {
    cursor: pointer;
  }
</style>
