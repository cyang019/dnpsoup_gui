<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'dnpsoup_gui'
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }

  router-view {
    width: 100%;
    height: 100%;
  }
</style>
