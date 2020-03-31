<template>
  <div id="add-emr" class="container">
    <div v-if="!adding" class="form-row">
      <button class='btn btn-primary btn-sm col-sm-3' @click='adding=true'>
        <i class='far fa-plus-square'></i>
        <span>Add Emr</span>
      </button>
    </div>
    <form v-else id='add-emr-form' 
      @submit.prevent='onSubmit'
      class='border border-primary'>
      <div class="form-row">
        <label for="emr-name" class="col-form-label">Name:</label>
        <input 
          type="text" name="emr-name" id="emr-name"
          v-model.trim="emr.name"
          class="col-sm-3"
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
          type="submit" class="btn btn-primary btn-sm col-sm-2">
          <span> Add Emr</span>
        </button>
      </div>
      <div v-if="addingChannel" class="form-row form-channel-row">
        <label for="channel" class="col-form-label">Channel:</label>
        <select name="" id="channel" class="col-sm-1">
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
          Add
        </div>
        <div id='add-channel-action-btn'
          class='btn btn-primary btn-sm col-sm-1' 
          @click='addingChannel=false'
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
import { mapState } from 'vuex'

export default {
  name: 'add-emr',
  data () {
    return {
      adding: false,
      addingChannel: false,
      emr: {
        name: '',
        channels: []
      },
      tempChannel: {
        frequency: 0.0, // gamma B1
        phase: 0.0, // in degrees
        offset: 0.0 // unused
      },
      channelOptions: [
        'e'
      ],
      msgGamma: '&#x3B3;'
    }
  },
  computed: {
    ...mapState('pulseseq', ['emrs'])
  },
  methods: {
    onSubmit (e) {
      console.log('onSubmit')
    },
    addChannel () {
      this.addingChannel = false
    },
    resetTempChannel () {
      this.tempChannel.frequency = 0.0
      this.tempChannel.phase = 0.0
      this.tempChannel.offset = 0.0
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
  margin: 3px 4px;
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

</style>
