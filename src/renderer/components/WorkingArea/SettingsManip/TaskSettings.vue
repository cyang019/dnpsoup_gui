<template>
  <div class="card">
    <div class="card-header">
      <span>task settings</span>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column">
        <div v-if="editTaskName" class="d-flex flex-row"
          @keydown.enter="editTaskNameOkClicked"
          @keydown.esc="editTaskNameCancelClicked"
        >
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
          <div class="btn btn-light btn-sm" @click="editTaskNameOkClicked">
            <i class="fas fa-check text-success"></i>    
          </div>
          <div class="btn btn-light btn-sm" @click="editTaskNameCancelClicked">
            <i class="fas fa-ban text-danger"></i>    
          </div>
        </div>
        <div v-else class="d-flex flex-row"
          @click="editTaskNameClicked"
        >
          <div class="p m-1">
            <span>Task Name: </span>
            <span
              class="bg-light m-1 px-2 py-1 border border-info rounded"
            >
              {{stateTaskName}}
            </span>
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
      return this.stateTaskName + 'Form'
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
      this.taskName = String(this.stateTaskName)
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
