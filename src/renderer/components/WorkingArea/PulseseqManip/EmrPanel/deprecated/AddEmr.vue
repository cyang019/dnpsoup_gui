<template>
  <div id="add-emr" class="container">
    <p v-if="errors.length">
      <small v-for="error in errors" :key="error.id" class="text-danger">
        {{ error.msg }}
      </small>
    </p>
    <div v-if="!adding">
      <button class='btn btn-primary btn-sm col-sm-3' @click='adding=true'>
        <i class='far fa-plus-square'></i>
        <span>Add Emr</span>
      </button>
    </div>
    <div v-if="adding" class="d-flex flex-column justify-content-between">
      <div v-for="channel in emr.channels" :key="channel.spinType">
        <p>
          [{{channel.spinType}}]
          {{decode(msgGamma)}}B1: {{channel.frequency}} Hz
          Phase: {{channel.phase}}
        </p>
      </div>
    </div>
    <form v-if="adding" id='add-emr-form' 
      @submit.prevent='onSubmit'
      class='border border-primary'>
      <div class="form-row">
        <label for="emr-name"
          class='col-form-label'
        >
          Name:
        </label>
        <input 
          type="text" name="emr-name" id="emr-name"
          v-model.trim="emr.name"
          class='col-sm-3'
          :class="{ 'border-danger': nameError, 'border-primary': !nameError}"
        >
        <div v-if="!addingChannel"
          id="add-channel-btn"
          class='btn btn-primary btn-sm col-sm-2 ml-auto align-middle' 
          @click='addingChannel=true'
        >
          <i class='fas fa-plus'></i>
          <span>Channel</span>
        </div>
        <button v-if="emr.channels.length>0 && !addingChannel"
          type="submit" class="btn btn-primary btn-sm col-sm-2 channel-add-emr">
          <span>Add Emr</span>
        </button>
        <input v-if="!addingChannel"
          type="cancel"
          class="btn btn-primary btn-sm col-sm-2 channel-add-emr"
          @click="cancelAddEmr"
          value='Cancel'
        >
      </div>
      <div v-if="addingChannel" class="form-row form-channel-row">
        <label for="channel" class="col-form-label">Channel:</label>
        <select 
          name="channel" id="channel" class="col-sm-1" 
          v-model='tempChannel.spinType'
        >
          <option v-for="option in channelOptions" :value="option" :key="option">
            {{option}}
          </option>
        </select>

        <label
          for="gammaB1" 
          class="col-form-label"
          data-toggle="tooltip"
          data-placement="top"
          title="Intensity in terms of frequency (Hz)"
        >
          <span> {{decode(msgGamma)}}</span>B1</label>
        <input 
          type="number" 
          name="gammaB1" id="gammaB1" 
          v-model.number=tempChannel.frequency
          class="col-sm-2"
          step="any"
        >
        <label for="gammaB1" class="col-form-label">Hz</label>

        <label
          for="phase"
          class="col-form-label"
          data-toggle="tooltip"
          data-placement="top"
          title="Phase in degrees"
        >Phase:</label>
        <input 
          type="number" 
          name="phase" id="phase" 
          v-model.number=tempChannel.phase
          class="col-sm-2"
          step="any"
        >

        <div id='add-channel-action-btn'
          class='btn btn-primary btn-sm col-sm-1' 
          @click='addChannel'
        >
          <i class='fas fa-plus'></i>
        </div>
        <div id='add-channel-action-btn'
          class='btn btn-primary btn-sm col-sm-1' 
          @click='cancelAddingChannel'
          data-toggle="tooltip"
          data-placement="top"
          title="Cancel adding channel"
        >
          <i class='fas fa-trash-alt channel-icon'></i>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { decode } from 'he'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'add-emr',
  data () {
    return {
      adding: false,
      addingChannel: false,

      errors: [],
      nameError: false,
      errorId: 0,

      emr: {
        name: '',
        channels: []
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
  computed: {
    ...mapState('pulseseq', ['emrs', 'channelOptions'])
  },
  methods: {
    ...mapActions('pulseseq', ['addEmr', 'deleteEmrByName', 'updateEmr']),

    validateName () {
      if (this.emr.name.length === 0) {
        this.errors.push({id: parseInt(this.errorId), msg: 'Missing Emr Name.'})
        ++this.errorId
        this.nameError = true
        return false
      } else {
        this.nameError = false
        return true
      }
    },
    onSubmit (e) {
      this.errors = []
      let emr = {
        name: this.emr.name.slice(0, this.emr.name.length),
        channels: []
      }
      if (!this.validateName()) {
        return
      }
      let index = this.emrs.findIndex(item => item.name === emr.name)
      if (index !== -1) {
        this.errors.push({
          id: parseInt(this.errorId),
          msg: 'Emr Component ' + emr.name + ' already exists.'
        })
        ++this.errorId
        return
      }
      for (const channel of this.emr.channels) {
        emr.channels.push(Object.assign({}, channel))
      }
      this.addEmr(emr)

      this.adding = false
      this.addingChannel = false
      this.resetEmr()
    },
    cancelAddEmr () {
      this.errors = []
      this.errorId = 0
      this.nameError = false
      this.adding = false
      this.addingChannel = false
    },
    addChannel () {
      this.errors = []
      this.errorId = 0
      let index = this.emr.channels.findIndex(
        channel => channel.spinType === this.tempChannel.spinType)
      if (index !== -1) {
        this.errors.push({
          id: parseInt(this.errorId),
          msg: 'channel' + this.tempChannel.spinType.slice(0, this.tempChanel.spinType.length) + ' already exists in emr.'
        })
        ++this.errorId
        return
      }
      this.addingChannel = false
      this.emr.channels.push(Object.assign({}, this.tempChannel))
      this.resetTempChannel()
    },
    resetEmr () {
      this.emr = {
        name: '',
        channels: []
      }
    },
    resetTempChannel () {
      this.tempChannel.frequency = 0.0
      this.tempChannel.phase = 0.0
      this.tempChannel.offset = 0.0
    },
    cancelAddingChannel () {
      this.addingChannel = false
      this.errors = []
    },
    decode (str) {
      return decode(str)
    }
  }
}
</script>

<style scoped>
#add-emr {
  font-size: 0.8rem;
  padding: 1px;
}

#add-channel-btn {
  font-size: 0.7rem;
  margin: 3px 3px;
}

.channel-add-emr {
  font-size: 0.7rem;
  margin: 3px 3px;
}

#add-channel-action-btn-group {
  margin: 0 0 0 4px;
}

#add-channel-action-btn {
  margin: 1px;
  width: 1.5rem;
  padding: 0 1px;
}

form {
  margin: 1px;
}

.channel-icon {
  width: 0.6rem;
  font-size: 0.6rem;
}

.error-text {
  color: #ff4444;
}
</style>
