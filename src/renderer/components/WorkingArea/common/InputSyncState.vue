<template>
  <div>
    <div v-if="editValue"
      class="d-flex flex-row"
      v-on:keyup.enter="editValueOkClicked"
      v-on:keyup.esc="editValueCancelClicked"
    >
      <div class="p m-1">
        <span>{{name}}: </span>
      </div>
      <input v-if="type==='text'" 
        type="text" id="temp-value-input"
        v-model="tempValue"
      >
      <input v-else 
        type="number" id="temp-value-input" step="any"
        v-model="tempValue"
      >
      <div class="btn btn-light btn-sm" @click="editValueOkClicked">
        <i class="fas fa-check text-success"></i>    
      </div>
      <div class="btn btn-light btn-sm" @click="editValueCancelClicked">
        <i class="fas fa-ban text-danger"></i>    
      </div>
    </div>
    <div v-else class="p m-1"
      @click="editClicked"
      data-toggle="tooltip"
      data-placement="top"
      title="Click to edit"
    >
      <span>{{name}}: </span>
      <span class="border-bottom border-secondary-bottom pl-1 pr-4 ml-1"
        @mouseover="hoverInputArea=true"
        @mouseleave="hoverInputArea=false"
        :class="{ 'bg-light': hoverInputArea }"
      >
        {{stateValue}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'input-sync-state',
  props: ['name', 'stateValue', 'type'],
  computed: {
    ...mapState('InputState', ['activeInputCurrent, activeInputPrev']),
    defaultFinish () {
      if (this.editValue && !this.activeInput) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      tempValue: 0,
      editValue: false,
      hoverInputArea: false
    }
  },
  methods: {
    ...mapActions('InputState', [
      'setCurrentInputActive', 'setCurrentInputFinished',
      'setPrevInputActive', 'setPrevInputFinished'
    ]),
    editClicked () {
      this.tempValue = this.stateValue
      this.editValue = true
    },
    editValueOkClicked () {
      this.editValue = false
      this.$emit('input-sync-state-ok-clicked', this.tempValue)
    },
    editValueCancelClicked () {
      this.tempValue = this.stateValue
      this.editValue = false
    }
  }
}
</script>
