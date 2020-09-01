<template>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" :value="spinId" v-model="checked" @change="toggled">
    <label class="form-check-label">{{spinId}}</label>
  </div>
</template>

<script>
export default {
  name: 'checkbox-spin-id',
  props: ['spinId'],
  data () {
    return {
      checked: false
    }
  },
  methods: {
    toggled () {
      if (this.checked) {
        this.$emit('spin-chosen-for-group', this.spinId)
      } else {
        this.$emit('spin-unselect-for-group', this.spinId)
      }
    }
  }
}
</script>

<style scoped>

</style>