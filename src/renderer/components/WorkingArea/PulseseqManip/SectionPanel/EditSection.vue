<template>
  <div id="edit-section" 
    class="p-1 m-0 d-flex flex-column flex-fill border border-secondary rounded"
  >
    <div class="align-self-center">
      <span class="text-secondary">Section</span>
    </div>
    <small v-if="nameError.length > 0" class="text-danger">
      {{nameError}}
    </small>
    <div class="form-group mb-0">
      <label for="name" class="col-form-label">
        Name:
      </label>
      <input type="text" id="name" v-model="tempSection.name">
    </div>
    <div class="form-group mb-0">
      <label for="section-type" class="col-form-label">
        Type:
      </label>
      <select name="section-type" id="section-type" 
        v-model="tempType"
      >
        <option v-for="option in sectionOptions" :key="option"
          :value="option"
        >
          {{option}}
        </option>
      </select>
    </div>
    <small v-if="sizeError.length > 0" class="text-danger">
      {{sizeError}}
    </small>
    <div class="form-group mb-0">
      <label for="section-size" class="col-form-label">
        Size:
      </label>
      <input type="number" name="section-size" id="section-size"
        v-model.number="tempSection.size"
        step="1"
      >
    </div>
    <!-- per section-type -->
    <div v-if="['Pulse', 'Chirp', 'Section'].includes(tempType)"
      class="d-flex flex-column"
    >
      <div v-if="['Pulse', 'Chirp'].includes(tempType)" class="p">
        Member Emr:
      </div>
      <div v-if="tempType === 'Section'">
        Member Sections:
      </div>
      <small v-if="memberError.length > 0" class="text-danger">
        {{memberError}}
      </small>
      <div class="d-flex flex-wrapped">
        <div v-for="(member, index) in tempSection.names"
          :key="index"
          class="section-member"
        >
          <section-member-name
            v-bind:name="member"
            v-bind:type="tempType"
            v-bind:nameContainer="tempSection.name"
            v-on:delete-member-name="deleteMember($event)"
          >
          </section-member-name>
        </div>
        <div v-if="tempSection.names.length === 0 || tempType === 'Section'">
          <div v-if="!addingMember" 
            @click="addingMember=true"
            class="btn btn-secondary btn-sm"
          >
            <i class='fas fa-plus'></i>
          </div>
          <div v-else 
            class='form-group section-members border border-light'>
            <div v-if="['Pulse', 'Chirp'].includes(tempType)">
              <select
                name="emr-select-option" id="emr-select-option" 
                v-model="tempMember"
                @change="addMember"
              >
                <option value="">-</option>
                <option 
                  v-for="emr in emrs" 
                  :key="emr.name" :value="emr.name">
                  {{emr.name}}
                </option>
              </select>
            </div>
            <div v-if="tempType === 'Section'">
              <select
                name="section-select-option" id="section-select-option" 
                v-model="tempMember"
                @change="addMember"
              >
                <option value="">-</option>
                <option 
                  v-for="section in sections.filter(section => section.name !== tempSection.name)" 
                  :key="section.name" :value="section.name">
                  {{section.name}}
                </option>
              </select>
            </div>
          </div>  
        </div>
      </div>
      <div v-if="tempType === 'Chirp'" class="form-group mb-0">
        <label for="section-span" class="col-form-label">
          span
        </label>
        <input type="number" id="section-span" 
          step="any" v-model="tempSection.span">
      </div>
      <div v-if="tempType === 'Section'" class='card'>
        <div class='card-body phase0-content'>
          <div class='card-title'
            data-toggle="tooltip" data-placement="top" 
            title="If to reset phase0 to a random number when entering the section."
          >
            phase0
          </div>
          <div class='form-group mb-0'>
            <label for="phase0-reset" class="col-form-label">
              reset:
            </label>
            <input type="radio" id="phase0-reset-true" value="true" 
              v-model="tempSection.phase0.reset">
            <label for="phase0-reset-true" class="col-form-label">
              true
            </label>
            <input type="radio" id="phase0-reset-false" value="false" 
              v-model="tempSection.phase0.reset">
            <label for="phase0-reset-true" class="col-form-label">
              false
            </label>
          </div>
          <div class='form-group mb-0'>
            <label for="phase0-seed" class="col-form-label">
              seed:
            </label>
            <input type="number" id="phase0-seed" step="1" 
              v-model="tempSection.phase0.seed"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex-fill"></div>
    <div class="d-flex flex-row justify-content-end">
      <div class="btn btn-light btn-sm"
        @click="okClicked"
      >
        <span class="text-success"><i class='fas fa-check'></i></span>
        <span class="p">OK</span>
      </div>
      <div class="btn btn-light btn-sm"
        @click="cancelClicked"
      >
        <span class="text-danger"><i class='fas fa-ban'></i></span>
        <span class="p">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SectionMemberName from './SectionMemberName.vue'

export default {
  name: 'edit-section',
  props: ['section', 'purpose'],
  components: {
    SectionMemberName
  },
  data () {
    return {
      addingMember: false,
      nameError: '',
      sizeError: '',
      memberError: '',

      tempType: this.section.type,
      tempMember: '',
      tempSection: this.copySection()
    }
  },
  computed: {
    ...mapState('pulseseq', ['sectionOptions', 'emrs', 'sections'])
  },
  methods: {
    ...mapActions('pulseseq', ['updateSection', 'addSection']),

    copySection () {
      let tempSection = {
        name: '',
        type: 'Delay',
        size: 0,
        names: [],
        span: 0,
        spinType: '',
        phase0: {
          reset: false,
          seed: 0
        },
        params: {}
      }
      tempSection.name = this.section.name.slice(0, this.section.name.length)
      tempSection.size = parseInt(this.section.size)
      if (this.section.type !== 'Delay') {
        tempSection.names = Object.assign([], this.section.names)
      }
      if (this.section.type === 'Chirp') {
        tempSection.span = parseFloat(this.section.span)
        tempSection.spinType = this.section.spinType.slice(0, this.section.spinType.length)
      }
      if (this.section.type === 'Section') {
        tempSection.phase0 = Object.assign({}, this.section.phase0)
      }
      return tempSection
    },
    resetTempSection () {
      this.tempSection = {
        name: '',
        type: 'Delay',
        size: 0,
        names: [],
        span: 0,
        spinType: '',
        phase0: {
          reset: false,
          seed: 0
        },
        params: {}
      }
    },
    addMember () {
      this.tempSection.names.push(this.tempMember.slice(0, this.tempMember.length))
      this.tempMember = ''
      this.addingMember = false
    },
    deleteMember (memberName) {
      console.log(`memberName: ${memberName}`)
      this.tempSection.names = this.tempSection.names.filter(
        name => name !== memberName
      )
      this.tempMember = ''
      this.addingMember = false
    },
    validateResults () {
      this.nameError = ''
      let result = true
      if (this.tempSection.name.length === 0) {
        this.nameError = 'Name cannot be empty.'
        result = false
      }

      if (this.purpose === 'add') {
        let index = this.sections.findIndex(section => section.name === this.tempSection.name)
        if (index !== -1) {
          this.nameError = 'Section name already exists.'
          result = false
        }
      }

      this.sizeError = ''
      if (this.tempSection.size <= 0) {
        this.sizeError = 'Size cannot be zero.'
        result = false
      }

      this.memberError = ''
      if (this.tempSection.type === 'Section' && this.tempSection.names.length === 0) {
        this.memberError = 'Please add at least one component to the section.'
        result = false
      } else if (['Pulse', 'Chirp'].includes(this.tempSection.type) &&
      this.tempSection.names.length === 0) {
        this.memberError = 'Need one Emr component.'
        result = false
      }

      return result
    },
    okClicked () {
      if (!this.validateResults()) return

      let committedSection = {
        name: this.tempSection.name.slice(0, this.tempSection.name.length),
        size: parseInt(this.tempSection.size),
        type: this.tempType.slice(0, this.tempType.length),
        names: [],
        params: {}
      }

      switch (committedSection.type) {
        case 'Section':
          committedSection['names'] = Object.assign([], this.tempSection.names)
          committedSection['phase0'] = Object.assign({}, this.tempSection.phase0)
          break
        case 'Pulse':
          committedSection.names = Object.assign([], this.tempSection.names)
          break
        case 'Chirp':
          committedSection.names = Object.assign([], this.tempSection.names)
          committedSection.span = parseFloat(this.tempSection.span)
          committedSection.spinType = this.tempSection.spinType.slice(0, this.tempSection.spinType.length)
          break
        case 'default':
          break
      }

      if (this.purpose === 'edit') {
        this.updateSection(committedSection)
        this.$emit('edit-section-finish', true)
      } else {
        this.addSection(committedSection)
        this.$emit('add-section-finish', true)
      }
    },
    cancelClicked () {
      if (this.purpose === 'edit') {
        this.$emit('edit-section-finish', false)
      } else {
        this.$emit('add-section-finish', false)
      }
    }
  },
  watch: {
    tempType: {
      handler: function () {
        this.tempMember = ''
        this.tempSection.names = []
      },
      deep: true
    }
  }
}
</script>

<style scoped>
#edit-section {
  font-size: 0.8rem;
}

.section-member-content {
  margin: 0px;
  padding: 4px;
}

.phase0-content {
  margin: 2px;
  padding: 4px;
}
</style>