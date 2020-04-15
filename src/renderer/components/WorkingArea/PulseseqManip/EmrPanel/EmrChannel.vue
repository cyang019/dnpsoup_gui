<template>
  <div v-if="!editing">
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row">
          <div class="ml-2 mr-2">
            <span>{{tempChannel.spinType}}</span>
          </div>
          <div class="mr-2">
            <span class="mr-1">{{decode(msgGamma)}}B1</span>
            <span>{{tempChannel.frequency}}</span>
            <span>Hz</span>
          </div>
          <div class="mr-2">
            <span class="mr-1">Phase</span>
            <span>{{tempChannel.phase}}</span>
          </div>
          <div class="btn" @click="editing=true">
            <i class='fas fa-pen'></i>
          </div>
          <div class="btn" @click="removeChannel">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="d-flex flex-column">
    <div class="form-group mb-0">
      <label class="col-form-label">
        spin
      </label>
      <select v-model="tempChannel.spinType">
        <option v-for="option in channelOptions" :value="option" :key="option">
          {{option}}
        </option>
      </select>
    </div>
    <small v-if="gammaB1Error.length > 0" class="text-danger">
      {{gammaB1Error}}
    </small>
    <div class="form-group mb-0">
      <label class="col-form-label">
        {{decode(msgGamma)}}B1 (Hz)
      </label>
      <input type="number" step="any" v-model="tempChannel.frequency">
    </div>
    <div class="form-group mb-0">
      <label class="col-form-label">
        Phase (Degree)
      </label>
      <input type="number" step="any" v-model="tempChannel.phase">
    </div>
    <div class="d-flex flex-row justify-content-end">
      <div class="btn" @click="okClicked">
        <i class="fas fa-check"></i>
      </div>
      <div class="btn" @click="cancelClicked">
        <i class="fas fa-ban"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { decode } from 'he'
import { mapState } from 'vuex'

export default {
  name: 'emr-channel',
  props: ['channel'],
  computed: {
    ...mapState('pulseseq', ['channelOptions'])
  },
  data () {
    return {
      editing: false,
      tempChannel: this.copyChannel(),
      msgGamma: '&#x3B3;',
      gammaB1Error: ''
    }
  },
  methods: {
    copyChannel () {
      let result = {
        spinType: this.channel.spinType,
        frequency: parseFloat(this.channel.frequency),
        phase: parseFloat(this.channel.phase),
        offset: parseFloat(this.channel.offset)
      }
      return result
    },
    decode (str) {
      return decode(str)
    },
    okClicked () {
      let success = this.validate()
      if (!success) return
      this.channel = Object.assign({}, this.tempChannel)
      this.editing = false
    },
    cancelClicked () {
      this.tempChannel = this.copyChannel()
      this.editing = false
    },
    removeChannel () {
      this.editing = false
      this.$emit('emr-channel-remove', true)
    },
    validate () {
      let success = true
      if (this.tempChannel.frequency < 0) {
        this.gammaB1Error = 'Frequency cannot be negative.'
        success = false
      }
      return success
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 2px;
}
</style>
