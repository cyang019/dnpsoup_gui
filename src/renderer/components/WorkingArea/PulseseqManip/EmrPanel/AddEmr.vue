<template>
  <div id="add-emr" class="container">
    <div class="form-row">
      <label for="channel" class="col-form-label">Channel:</label>
      <input 
        type="text" 
        name="channel" id="channel" 
        placeholder="e"
        class="col-sm-1"
        disabled
      >

      <label for="gammaB1" class="col-form-label">gammaB1</label>
      <input 
        type="number" 
        name="gammaB1" id="gammaB1" 
        v-model.number=tempChannel.frequency
        class="col-sm-2"
        step="any"
      >
      <label for="gammaB1" class="col-form-label">Hz</label>

      <label for="phase" class="col-form-label">Phase:</label>
      <input 
        type="number" 
        name="phase" id="phase" 
        v-model.number=tempChannel.phase
        class="col-sm-2"
        step="any"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-emr',
  data () {
    return {
      emr: {
        name: '',
        channels: []
      },
      tempChannel: {
        frequency: 0.0, // gamma B1
        phase: 0.0, // in degrees
        offset: 0.0 // unused
      }
    }
  }
}
</script>

<style scoped>
#add-emr {
  font-size: 0.8rem;
}
</style>