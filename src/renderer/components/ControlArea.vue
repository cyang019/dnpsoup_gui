<template>
  <div id="control-area" class="d-flex flex-column">
    <p><strong>Execute Tasks</strong></p>
    <div class="d-flex flex-row justify-content-between">
      <button class="btn btn-secondary btn-md">
        Save to File
      </button>
      <buttn class="btn btn-secondary btn-md">
        Load from File
      </buttn>
      <button class="btn btn-primary btn-md">
        <span>
          Run
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'control-area'
}
</script>

<style scoped>
  #control-area {
    margin: 2px;
    border: 1px solid #aaa;
  }
</style>
