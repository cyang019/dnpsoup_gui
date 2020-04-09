<template>
  <div class="card">
    <div class="card-header">
      <span>task settings</span>
    </div>
    <div class="card-body">
      <div class="d-flex flex-column">
        <div class="form-group">
          <label for="task-name" class="col-form-label">
            Task Name:
          </label>
          <select name="task-name" id="task-name" 
            v-model="taskName"
            @change="setTaskName(taskName)"
          >
            <option v-for="option in taskOptions"
              :value="option.task"
              :key="option.name"
            >
              {{ option.name }}
            </option>
          </select>
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
    PowderIntensityForm,
    Scan1dForm,
    Scan2dForm
  },
  computed: {
    ...mapState('SimSettings', ['taskOptions']),
    currentTaskForm () {
      return this.taskName + 'Form'
    }
  },
  data () {
    return {
      taskName: 'Default'
    }
  },
  methods: {
    ...mapActions('SimSettings', ['setTaskName'])
  }
}
</script>

<style scoped>

</style>
