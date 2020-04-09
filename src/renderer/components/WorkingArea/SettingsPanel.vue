<template>
  <div id='settings-panel' class='flex-fill'>
    <div class='d-flex flex-column'>
      <task-settings></task-settings>
      <sample-settings></sample-settings>
      <hardware-settings></hardware-settings>
    </div>
  </div>
</template>

<script>
import SampleSettings from './SettingsManip/SampleSettings'
import HardwareSettings from './SettingsManip/HardwareSettings'
import TaskSettings from './SettingsManip/TaskSettings'

export default {
  name: 'settings-panel',
  components: {
    SampleSettings,
    HardwareSettings,
    TaskSettings
  }
}
</script>

<style scoped>

</style>
