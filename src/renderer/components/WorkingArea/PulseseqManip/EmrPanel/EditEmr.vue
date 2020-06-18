<template>
  <div id="edit-emr" class="container">
    <div class="d-flex flex-column">
      <small v-if="nameError.length > 0" class="text-danger">
        {{nameError}}
      </small>
      <div class="form-group mb-0">
        <label class="col-form-label">
          EMR Name
        </label>
        <input type="text" v-model="tempEmr.name">
      </div>
      <div v-if="!addingChannel">
        <div class="btn btn-primary btn-sm" @click="addChannel">
          <i class="fas fa-plus"></i>
          <span>Add Channel</span>
        </div>
      </div>
      <div v-else class="card">
        <div class="card-body">
          <div class="d-flex flex-column">
            <div class="form-group mb-0">
              <label class="col-form-label">spin</label>
              <select v-model="tempChannel.spinType">
                <option v-for="(option, index) in channelOptions" :key="index"
                  :value="option"
                >
                  {{option}}
                </option>
              </select>
            </div>
            <small v-if="gammaB1Error.length > 0" class="text-danger">
              {{gammaB1Error}}
            </small>
            <div class="form-group mb-0">
              <label class="col-form-group">
                {{decode(msgGamma)}}B1 (Hz)
              </label>
              <input class="col-md-3"
                type="number" step="any" 
                v-model="tempChannel.frequency"
              >
              <label for="" class="col-form-group ml-1">
                Phase (Degree)
              </label>
              <input class="col-md-3" 
                type="number" step="any" v-model="tempChannel.phase"
              >
            </div>
            <div class="d-flex flex-row justify-content-end">
              <div class="btn btn-light" @click="confirmAddChannel">
                <i class="fas fa-check"></i>    
              </div>
              <div class="btn btn-light" @click="cancelAddChannel">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(channel, index) in tempEmr.channels" :key=index>
        <emr-channel
          :channel="channel"
          :channelIndex="index"
          v-on:emr-channel-remove="removeChannel"
          v-on:emr-channel-change="changeChannel"
        >
        </emr-channel>
      </div>
      <div class="d-flex flex-row justify-content-end">
        <div class="btn btn-light" @click=okClicked>
          <i class="fas fa-check text-success"></i>
          <span>OK</span>
        </div>
        <div class="btn btn-light" @click=cancelClicked>
          <i class="fas fa-ban text-danger"></i>
          Cancel
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmrChannel from './EmrChannel'
import { mapState, mapActions } from 'vuex'
import { decode } from 'he'

export default {
  name: 'edit-emr',
  props: ['purpose', 'emr', 'emrIndex'],
  components: {
    EmrChannel
  },
  computed: {
    ...mapState('pulseseq', ['channelOptions', 'emrs'])
  },
  data () {
    return {
      addingChannel: false,

      nameError: '',
      gammaB1Error: '',

      tempEmr: {
        channels: Object.assign([], this.emr.channels),
        edit: this.purpose,
        index: parseInt(this.emrIndex),
        name: this.emr.name.slice(0, this.emr.name.length)
      },
      tempChannel: {
        spinType: 'e',
        frequency: 0.0, // gamma B1
        phase: 0.0, // in degrees
        offset: 0.0 // unused
      },
      msgGamma: '&#x3B3;'
    }
  },
  methods: {
    ...mapActions('pulseseq', ['addEmr', 'updateEmr']),
    copyEmr () {
      let result = {
        name: '',
        channels: [],
        edit: this.purpose,
        index: this.emrIndex
      }
      result.name = this.emr.name.slice(0, this.emr.name.length)
      for (const channel of this.emr.channels) {
        let tempC = Object.assign({}, channel)
        result.channels.push(tempC)
      }
      return result
    },
    okClicked () {
      let success = this.validateEmr()
      if (!success) return
      let committedEmr = Object.assign({}, this.tempEmr)
      this.updateEmr(committedEmr)
      this.$emit('edit-emr-finish', true)
    },
    cancelClicked () {
      this.resetChannel()
      this.$emit('edit-emr-finish', false)
    },
    addChannel () {
      this.addingChannel = true
      this.resetChannel()
    },
    confirmAddChannel () {
      let success = this.validateChannel()
      if (!success) return
      let commitedChannel = Object.assign({}, this.tempChannel)
      this.tempEmr.channels.push(commitedChannel)
      this.resetChannel()
      this.addingChannel = false
    },
    removeChannel (index) {
      this.tempEmr.channels.splice(index, 1)
    },
    changeChannel (event) {
      let success = this.validateChannel()
      if (!success) return
      this.tempEmr.channels.splice(event.channelIndex, 1, event.channelValue)
      this.addingChannel = false
      this.resetChannel()
    },
    cancelAddChannel () {
      this.addingChannel = false
      this.resetChannel()
    },
    resetChannel () {
      this.tempChannel = {
        spinType: 'e',
        frequency: 0.0, // gamma B1
        phase: 0.0, // in degrees
        offset: 0.0 // unused
      }
    },
    decode (str) {
      return decode(str)
    },
    validateChannel () {
      this.gammaB1Error = ''
      let success = true
      if (this.tempChannel.frequency < 0) {
        this.gammaB1Error = 'Frequency cannot be negative.'
        success = false
      }
      return success
    },
    validateEmr () {
      this.nameError = ''
      let success = true
      if (this.tempEmr.name.length === 0) {
        this.nameError = 'EMR name cannot be empty.'
        success = false
      }
      if (this.purpose === 'add') {
        let index = this.emrs.findIndex(elem => elem.name === this.tempEmr.name)
        if (index !== -1) {
          this.nameError = this.tempEmr.name + ' already exists.'
          success = false
        }
      }
      return success
    }
  }
}
</script>

<style scoped>
.container {
  margin: 2px;
  padding: 2px;
}

.card-body {
  padding: 2px;
}
</style>
