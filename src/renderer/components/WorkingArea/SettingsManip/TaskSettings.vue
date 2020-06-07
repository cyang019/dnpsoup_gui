<template>
  <div class="card">
    <div class="card-header">
      <span>task settings</span>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column">
        <div v-if="editTaskName" class="d-flex flex-row">
          <span>Task Name:</span>
          <select
            name="task-input-name" id="task-input-name" 
            v-model="taskName"
          >
            <option v-for="(option, index) in taskCandidates"
              :value="option"
              :key="index"
            >
              {{ option }}
            </option>
          </select>
          <div class="btn btn-light p-2" @click="editTaskNameOkClicked">
            <i class="fas fa-check"></i>    
          </div>
          <div class="btn btn-light p-2" @click="editTaskNameCancelClicked">
            <i class="fas fa-ban"></i>    
          </div>
        </div>
        <div v-else class="d-flex flex-row">
          <div class="p m-2">
            <span>Task Name: {{stateTaskName}}</span>
          </div>
          <div class="btn btn-light" @click="editTaskNameClicked">
            <i class="fas fa-pen"></i>    
          </div>
        </div>

        <component v-bind:is="currentTaskForm">
        </component>
      </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VSelect from 'vue-select'
import DefaultForm from './TaskForms/DefaultForm'
import BuildUpForm from './TaskForms/BuildUpForm'
import EigenValuesForm from './TaskForms/EigenValuesForm'
import FieldProfileForm from './TaskForms/FieldProfileForm'
import IntensityForm from './TaskForms/IntensityForm'
import PowderBuildUpForm from './TaskForms/PowderBuildUpForm'
import PowderBuildUpEnhancementForm from './TaskForms/PowderBuildUpEnhancementForm'
import PowderIntensityForm from './TaskForms/PowderIntensityForm'
import Scan1dForm from './TaskForms/Scan1dForm'
import Scan2dForm from './TaskForms/Scan2dForm'

export default {
  name: 'task-settings',
  components: {
    VSelect,
    DefaultForm,
    EigenValuesForm,
    FieldProfileForm,
    IntensityForm,
    BuildUpForm,
    PowderBuildUpForm,
    PowderBuildUpEnhancementForm,
    PowderIntensityForm,
    Scan1dForm,
    Scan2dForm
  },
  computed: {
    ...mapState('SimSettings', {
      // 'taskOptions': state => state.taskOptions,
      'taskCandidates': state => state.taskCandidates,
      'stateTaskName': state => state.simulation.task.name
    }),
    currentTaskForm () {
      return this.taskName + 'Form'
    }
  },
  data () {
    return {
      taskName: 'Default',
      editTaskName: false
    }
  },
  methods: {
    ...mapActions('SimSettings', ['setTaskName']),

    init () {
      this.taskName = String(this.stateTaskName)
    },

    editTaskNameClicked () {
      this.editTaskName = true
    },
    editTaskNameOkClicked () {
      this.setTaskName(this.taskName)
      this.editTaskName = false
    },
    editTaskNameCancelClicked () {
      this.editTaskName = false
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
