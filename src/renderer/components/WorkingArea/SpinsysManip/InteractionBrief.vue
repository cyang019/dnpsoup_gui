<template>
  <div id="spin-brief">
    <div
      v-if="!showDetails"
      class='brief rounded align-middle text-center border border-secondary text-secondary'
      @click="showDetails=true"
    >
      <span class="p-1">[{{genIndicesRepresentation()}}] {{this.interaction.name}}</span>
    </div>
    <div v-else
      class='details rounded align-middle text-center border border-primary text-primary'
    >
      <div class="container">
        <div class="col">
          <div class="row p-1 brief-header text-left" @click="showDetails=false">
            <span class="p-1">[{{genIndicesRepresentation()}}] {{interaction.name}}</span>
          </div>
          <div class="row p-1" v-if="hasEllipsoid">
            <span>
              xx: {{interaction.entries.x}}, yy: {{interaction.entries.y}}, zz: {{interaction.entries.z}}
            </span>
          </div>
          <div class="row p-1" v-if="hasEuler">
            Euler: {{interaction.entries.euler.alpha}}, {{interaction.entries.euler.beta}}, {{interaction.entries.euler.gamma}}
          </div>
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4 p-1 align-middle">
              <span @click="removeInteraction(interaction.id)">
                <i class="far fa-trash-alt delete"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'interaction-brief',
  props: ['interaction'],
  data () {
    return {
      showDetails: false,
      hasEuler: this.interaction.entries.hasOwnProperty('euler'),
      hasEllipsoid: this.interaction.entries.hasOwnProperty('x'),

      ids: this.interaction.entries.hasOwnProperty('id') ? [this.interaction.entries.id] : [this.interaction.entries.id1, this.interaction.entries.id2]
    }
  },
  methods: {
    ...mapActions('spinsys', ['removeInteraction']),

    genIndicesRepresentation () {
      return this.ids.join('-')
    }
  }
}
</script>

<style scoped>
.delete {
  cursor: pointer;
}

.brief {
  font-size: 0.8rem;
  height: 1.4rem;
  width: 8rem;
  margin: 1px 2px;
}

.brief-header {
  background-color: #efefef;
}

.details {
  font-size: 0.8rem;
  margin: 1px 2px;
  width: 10rem;
}

.container {
  padding: 1px;
}

.col {
  margin: 0;
  padding: 0 1px;
}
.row {
  margin: 0;
  padding: 0;
}
</style>
