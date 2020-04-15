<template>
  <div v-if="!editing">
    <div class="card">
      <div class="card-body">
        <div class="card-title text-light bg-dark text-center">
          <span>{{ section.name }}</span>
        </div>
        <div class="d-flex flex-row">
          <span class="mr-2">{{ section.type }}</span>
          <span>{{ section.size }}</span>
        </div>
        <div class="d-flex flex-row">
          <div v-for="name in section.names" class="card">
            <div class="card-body text-center">
              {{name}}
            </div>
          </div>
        </div>
        <div v-if="section.type === 'Chirp'" class="d-flex flex-row">
          <span>Chirp Span: {{section.span}}Hz</span>
          <span>on {{section.spinType}}</span>
        </div>
        <div v-if="section.type === 'Section'">
          <span v-if="section.phase0.reset">phase0 reset with seed {{section.phase0.seed}}</span>
        </div>
        <div class="d-flex flex-row justify-content-end">
          <div class="btn btn-light btn-sm"
            @click="editClicked"
          >
            <span class="text-secondary"><i class='fas fa-pen'></i></span>
          </div>
          <div class="btn btn-light btn-sm"
            @click="deleteClicked"
          >
            <span class="text-secondary"><i class='far fa-trash-alt'></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <edit-section
      v-bind:section="section"
      v-bind:purpose="'edit'"
      v-on:edit-section-finish="editing=false"
    >
    </edit-section>
  </div>
</template>

<script>
import EditSection from './EditSection.vue'
import { mapActions } from 'vuex'

export default {
  name: 'section-brief',
  components: {
    EditSection
  },
  props: ['section'],
  data () {
    return {
      editing: false,
      tempSection: {
        name: '',
        type: 'Delay',
        size: 0,
        names: [],
        span: 0,
        spinType: '',
        phase0: {

        },
        params: {}
      }
    }
  },
  methods: {
    ...mapActions('pulseseq', ['deleteSectionByName']),

    editClicked () {
      this.copySection(this.section)
      this.editing = true
    },
    deleteClicked () {
      this.editing = false
      this.deleteSectionByName(this.section.name)
    },
    copySection (section) {
      this.tempSection.name = this.section.name.slice(0, this.section.name.length)
      this.tempSection.type = this.section.type.slice(0, this.section.type.length)
      this.tempSection.size = parseInt(this.section.size)
      if (this.section.hasOwnProperty('names')) {
        this.tempSection.names = Object.assign([], this.section.names)
      }
      if (this.section.hasOwnProperty('span')) {
        this.tempSection.span = parseInt(this.section.span)
        this.tempSection.spinType = this.section.spinType.slice(0, this.section.spinType.length)
      }
      if (this.section.hasOwnProperty('phase0')) {
        this.tempSection.phase0 = Object.assign({}, this.section.phase0)
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
