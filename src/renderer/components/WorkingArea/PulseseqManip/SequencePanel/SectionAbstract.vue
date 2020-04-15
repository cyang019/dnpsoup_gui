<template>
  <div id="section-abstract" class="card">
    <div class="card-body">
      <div class="d-flex flex-row">
        <div class="mr-3">
          <span>{{ section.name }}</span>
        </div>
        <div id="delete-pulseseq-sub-name" @click="removeName">
          <span>
            <i class="fas fa-times"></i>
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

#delete-pulseseq-sub-name {
  cursor: pointer;
}
</style>
