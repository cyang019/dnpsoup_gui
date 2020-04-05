<template>
  <div v-if="!adding"
    id="add-subsequence"
    @click="adding=true"
    class="d-flex flex-row"
  >
    <btn-add-vertical></btn-add-vertical>
  </div>
  <div v-else class="d-flex flex-row">
    <select 
      class="dropdown-toggle mr-2"
      v-model="tempName"
      @change="addSection()"
    >
      <option 
        class="btn btn-secondary dropdown-toggle" 
        type="button" 
        id="select-section-name"
        value=''
      >
        - Section -
      </option>
      <option v-for="section in sections" :key="section.name"
        class="dropdown-item" type="button"
        :value="section.name"
      >
        {{section.name}}
      </option>
    </select>
    <div>
      <span @click="adding=false">
        <i class="fas fa-times"></i>
      </span>
    </div>
  </div>
</template>

<script>
import BtnAddVertical from '../../common/BtnAddVertical.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'add-sub-sequence',
  components: {
    BtnAddVertical
  },
  computed: {
    ...mapState('pulseseq', ['sections'])
  },
  data () {
    return {
      adding: false,
      tempName: ''
    }
  },
  methods: {
    ...mapActions('pulseseq', ['addSectionToSequence']),

    addSection () {
      this.addSectionToSequence(this.tempName.slice(0, this.tempName.length))
      this.adding = false
      this.tempName = ''
    }
  }
}
</script>

<style scoped>
#add-subsequence {
  padding: 0;
  margin: 0;
}
</style>
