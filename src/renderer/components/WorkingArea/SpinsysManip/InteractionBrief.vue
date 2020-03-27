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
            <span class="p-1">[{{genIndicesRepresentation()}}] {{this.interaction.name}}</span>
          </div>
          <div class="row p-1" v-if="hasEllipsoid">
            <span>
              xx: {{this.interaction.entries.x}}, yy: {{this.interaction.entries.y}}, zz: {{this.interaction.entries.z}}
            </span>
          </div>
          <div class="row p-1" v-if="hasEuler">
            Euler: {{this.interaction.entries.euler.alpha}}, {{this.interaction.entries.euler.beta}}, {{this.interaction.entries.euler.gamma}}
          </div>
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4 p-1 align-middle">
              <span @click="removeInteraction(this.interaction.id)">
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

      ids: this.interaction.entries.hasOwnProperty('id') ? [this.interaction.entries.id] : [this.interaction.entries.id1, this.interaction.entries.id2]
      // name: Object.assign('', this.interaction.name),
      // value: undefined,
      // hasEllipsoid: this.interaction.entries.hasOwnProperty('x'),
      // ellipsoid: this.interaction.entries.hasOwnProperty('x') ? {
      //   x: parseFloat(this.interaction.entries.x),
      //   y: parseFloat(this.interaction.entries.y),
      //   z: parseFloat(this.interaction.entries.z)
      // } : {x: 0, y: 0, z: 0},
      // hasEuler: this.interaction.entries.hasOwnProperty('euler'),
      // euler: this.interaction.entries.hasOwnProperty('euler') ? {
      //   alpha: parseFloat(this.interaction.entries.euler.alpha),
      //   beta: parseFloat(this.interaction.entries.euler.beta),
      //   gamma: parseFloat(this.interaction.entries.euler.gamma)
      // } : {alpha: 0, beta: 0, gamma: 0},
      // id: parseInt(this.interaction.id)
    }
  },
  methods: {
    ...mapActions('spinsys', ['removeInteraction']),

    genIndicesRepresentation () {
      return this.ids.join('-')
    },

    hasEllipsoid () {
      this.interaction.entries.hasOwnProperty('x')
    },

    hasEuler () {
      this.interaction.entries.hasOwnProperty('euler')
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
  width: 10rem;
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
