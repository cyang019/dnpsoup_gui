<template>
  <div id="section-abstract" class="card">
    <div class="card-body">
      <div class="card-title text-center">
        <span>{{ section.name }}</span>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row">
          <span class="mr-2">{{ section.type }}</span>
          <span>{{ section.size }}</span>
        </div>
        <div v-if="section.hasOwnProperty('names')" class="d-flex flex-row">
          <div v-for="name in section.names" class="card">
            <div class="card-body">
              <span>{{ name }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
          <span id="delete-pulseseq-name" @click="removeName">
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'section-abstract',
  props: ['sectionName'],
  data () {
    return {
      section: this.getSection(this.sectionName)
    }
  },
  methods: {
    ...mapGetters('pulseseq', ['getSectionByName', 'getSections']),
    removeName () {
      let name = this.section.name.slice(0, this.section.name.length)
      this.$emit('remove-subsequence-name', name)
    },
    getSection () {
      let getSectionByNameFn = this.getSectionByName()
      let tmpSection = getSectionByNameFn(this.sectionName)
      return tmpSection
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 4px;
}

#delete-pulseseq-name {
  cursor: pointer;
}
</style>
