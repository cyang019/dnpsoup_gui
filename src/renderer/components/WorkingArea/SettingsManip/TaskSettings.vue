<template>
  <div class="card">
    <div class="card-header">
      <span>task settings</span>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column">
        <div class="d-flex flex-wrap mb-2">
          <button v-for="(option, index) in taskCandidates" 
            :key="index"
            @click="taskNameSelected(option)"
            class="task-quick-btn badge badge-light mr-1 my-1 badge-default-btn"
          >
            {{option}}
          </button>
        </div>
        <div class="d-flex flex-column">
          <div class="p m-1">
            <span>Task Name: </span>
            <span
              class="bg-light m-1 px-2 py-1"
            >
              {{stateTaskName}}
            </span>
          </div>

          <component v-bind:is="currentTaskForm">
          </component>
        </div>
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
      'tasksSingleton': state => state.tasksSingleton,
      'tasksComposite': state => state.tasksComposite,
      'tasks1d': state => state.tasks1d,
      'tasks2d': state => state.tasks2d,
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
    taskNameSelected (name) {
      this.setTaskName(name)
      this.taskName = String(this.stateTaskName)
      this.editTaskName = false
    },
    taskNameChanged () {
      this.editTaskNameOkClicked()
      this.editTaskName = false
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
  .task-quick-btn {
    min-width: 6rem;
  }
</style>
