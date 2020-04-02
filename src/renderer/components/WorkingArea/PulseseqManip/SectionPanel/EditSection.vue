<template>
  <div id="edit-section">
    <div class="d-flex flex-column">
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
        <select name="section-type" id="section-type" v-model="tempType">
          <option v-for="option in sectionOptions" 
            :value="option" :key="option">
            {{option}}
          </option>
        </select>
      </div>
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
        <div class="d-flex flex-wrapped">
          <div v-if="tempType === 'Section'">
            <div v-for="member in tempSection.names" :key="member"
              class="card section-member"
            >
              <span class="card-body section-member-content">{{member}}</span>
            </div>
          </div>
          <div v-else>
            <div v-for="member in tempSection.names.slice(0,1)" :key="member"
              class="card section-member"
            >
              <span class="card-body section-member-content">{{member}}</span>
            </div>
          </div>
          
          <div v-if="tempSection.names.length === 0 || tempType === 'Section'">
            <div 
              v-if="!addingMember" 
              @click="addingMember=true"
              class="btn btn-secondary btn-sm"
            >
              <i class='fas fa-plus'></i>
            </div>
            <div v-else class='section-members border border-light'>
              <select
                v-if="['Pulse', 'Chirp'].includes(tempType)"
                name="add-emr" id="add-emr" v-model="tempMember"
              >
                <option 
                  v-for="emr in emrs" :key="emr.name" :value="emr.name">
                  {{emr.name}}
                </option>
              </select>
              <select
                v-if="tempType === 'Section'"
                name="add-section" id="add-section" v-model="tempMember"
              >
                <option 
                  v-for="section in sections.filter(section => section.name !== tempSection.name)" 
                  :key="section.name" :value="section.name">
                  {{section.name}}
                </option>
              </select>
              <span @click="addMember">
                <i class="fas fa-check-circle"></i>
              </span>
              <span @click="addingMember=false">
                <i class="fas fa-ban"></i>
              </span>
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'edit-section',
  props: ['section'],
  data () {
    return {
      editing: false,
      addingMember: false,
      tempType: 'Delay',
      tempSection: {
        name: '',
        size: 0,
        names: [],
        span: 0,
        spinType: '',
        phase0: {
          reset: false,
          seed: 0
        },
        params: {}
      },
      tempMember: ''
    }
  },
  computed: {
    ...mapState('pulseseq', ['sectionOptions', 'emrs', 'sections'])
  },
  methods: {
    resetTempSection () {
      this.tempSection = {
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
    },
    addMember () {
      this.tempSection.names.push(this.tempMember.slice(0, this.tempMember.length))
      this.tempMember = ''
      this.addingMember = false
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