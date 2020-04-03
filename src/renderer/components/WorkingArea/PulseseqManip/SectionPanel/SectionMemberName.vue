<template>
  <div class="card">
    <div class="card-body">
      <div v-if="editing" class="d-flex flex-row">
        <small v-if="nameError.length > 0">{{nameError}}</small>
        <select v-if="type === 'Section'" 
          name="select-section-name" 
          id="select-section-name"
          v-model="tempName"
          v-on:change="nameSelected"
          class="mr-2"
        >
          <option value="">-</option>
          <option v-for="section in sections.filter(section => section.name !== nameContainer)"
            :key=section.name
            :value=section.name  
          >
            {{section.name}}
          </option>
        </select>
        <select v-else
          name="select-name" 
          id="select-name"
          v-model="tempName"
          v-on:change="nameSelected"
        >
          <option value="">-</option>
          <option v-for="emr in emrs"
            :key=emr.name
            :value=emr.name  
          >
            {{emr.name}}
          </option>
        </select>
        <span @click="editing=false">
          <i class="fas fa-times"></i>
        </span>
      </div>
      <div v-else class="d-flex flex-row">
        <span class="section-member-content mr-2">{{name}}</span>
        <span @click=editClicked class="mr-1">
          <i class="fas fa-pen"></i>
        </span>
        <span @click=deleteClicked>
          <i class="fas fa-times"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'section-member-name',
  props: ['name', 'type', 'nameContainer'],
  computed: {
    ...mapState('pulseseq', ['sections', 'emrs'])
  },
  data () {
    return {
      editing: false,
      nameError: '',

      tempName: ''
    }
  },
  methods: {
    editClicked () {
      this.editing = true
      this.tempName = ''
    },
    deleteClicked () {
      let tempName = this.name.slice(0, this.name.length)
      this.$emit('delete-member-name', tempName)
    },
    nameSelected () {
      this.nameError = ''
      if (this.name.length === 0) {
        this.nameError = 'Need to select a non-empty name.'
      }
      if (this.nameError.length === 0) {
        this.name = this.tempName.slice(0, this.tempName.length)
        this.editing = false
      }
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 4px;
}
</style>
