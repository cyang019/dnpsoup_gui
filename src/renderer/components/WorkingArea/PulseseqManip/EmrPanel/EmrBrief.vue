<template>
  <div id="emr-brief" class="d-flex flex-row">
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
    <div v-else class="d-flex flex-row">
      <edit-emr
        :emr=emr
        :purpose="'edit'"
        v-on:edit-emr-finish="editing=false"
      >
      </edit-emr>
    </div>
  </div>
</template>

<script>
import { decode } from 'he'
import { mapActions, mapState } from 'vuex'
import EditEmr from './EditEmr'

export default {
  name: 'emr-brief',
  props: ['emr'],
  components: {
    EditEmr
  },
  computed: {
    ...mapState('pulseseq', ['channelOptions'])
  },
  data () {
    return {
      msgGamma: '&#x3B3;',
      msgDegree: '&#186;',

      editing: false
    }
  },
  methods: {
    ...mapActions('pulseseq', ['deleteEmrByName', 'updateEmr']),
    initEdit () {
      this.editing = true
    },
    decode (str) {
      return decode(str)
    }
  }
}
</script>

<style scoped>
  #emr-brief-edit {
    width: 50%;
  }

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
