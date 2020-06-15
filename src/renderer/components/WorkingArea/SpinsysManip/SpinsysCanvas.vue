<template>
  <div id='spinsys-canvas'>
    <div :ref="chart.uuid" class="plot-area"></div>
  </div>
</template>

<script>
import plotly from 'plotly.js-dist'
import { mapState } from 'vuex'

export default {
  name: 'spinsys-canvas',
  computed: {
    ...mapState('spinsys', ['spins', 'interactions'])
  },
  data () {
    return {
      chart: {
        uuid: '123',
        traces: [this.genDefaultTrace()],
        layout: this.genDefaultLayout()
      }
    }
  },
  methods: {
    genDefaultLayout () {
      return {
        autosize: true,
        showlegend: false,
        margin: {
          l: 2,
          r: 2,
          b: 0,
          t: 0
        },
        scene: {
          aspectratio: {
            x: 1,
            y: 1,
            z: 1
          },
          camera: {
            center: {
              x: 0,
              y: 0,
              z: 0
            },
            eye: {
              x: 1.25,
              y: -2.5,
              z: 1.25
            },
            up: {
              x: 0,
              y: 0,
              z: 1
            }
          },
          xaxis: {
            type: 'linear',
            zeroline: true,
            range: [-1, 1]
          },
          yaxis: {
            type: 'linear',
            zeroline: true,
            range: [-1, 1]
          },
          zaxis: {
            type: 'linear',
            zeroline: true,
            range: [-1, 1]
          }
        }
      }
    },
    genDefaultTrace () {
      return {
        x: [0.0],
        y: [0.0],
        z: [0.0],
        mode: 'markers',
        type: 'scatter3d',
        marker: {
          color: 'rgb(15, 0, 0)',
          size: 1
        }
      }
    },
    deriveSpinTypeColor (spinType) {
      switch (spinType) {
        case 'e':
          return 'rgb(0,255,0)'
        case 'H1':
          return 'rgb(200,200,255)'
        case 'D2': case 'H2':
          return 'rgb(255, 255, 160)'
        case 'C13':
          return 'rgb(80, 80, 80)'
        case 'N15':
          return 'rgb(16, 80, 80)'
        default:
          return 'rgb(0, 0, 0)'
      }
    },
    genSpinTraces () {
      let traces = []
      let trace = {
        x: [],
        y: [],
        z: [],
        mode: 'markers',
        type: 'scatter3d',
        marker: {
          color: 'rgb(217, 217, 217)',
          size: 8,
          symbol: 'circle',
          line: {
            color: 'rgb(204, 204, 204)',
            width: 1
          },
          opacity: 0.8
        }
      }
      let colors = []
      for (const spin of this.spins) {
        trace.x.push(parseFloat(spin.x))
        trace.y.push(parseFloat(spin.y))
        trace.z.push(parseFloat(spin.z))
        colors.push(this.deriveSpinTypeColor(spin.spinType))
      }
      if (colors.length > 0) {
        trace.marker.color = colors
        traces.push(trace)
      }

      return traces
    },
    genInteractionTraces () {
      let traces = []
      for (const interaction of this.interactions) {
        if (interaction.name === 'dipole' || interaction.name === 'hyperfine') {
          let trace = {
            x: [],
            y: [],
            z: [],
            mode: 'lines',
            type: 'scatter3d',
            opacity: 0.5,
            line: {
              width: 6,
              color: 'rgb(180, 180, 180)',
              dash: 'dashdot'
            }
          }
          const id1 = interaction.entries.id1
          const id2 = interaction.entries.id2
          const spin1 = this.spins.find(spin => spin.id === id1)
          const spin2 = this.spins.find(spin => spin.id === id2)
          trace.x.push(spin1.x)
          trace.x.push(spin2.x)
          trace.y.push(spin1.y)
          trace.y.push(spin2.y)
          trace.z.push(spin1.z)
          trace.z.push(spin2.z)
          traces.push(trace)
        } else if (interaction.name === 'shielding') {

        }
      }

      return traces
    },
    genTraces () {
      let traces = [this.genDefaultTrace()]
      let spinTraces = this.genSpinTraces()
      let interactionTraces = this.genInteractionTraces()
      if (spinTraces.length > 0) {
        traces = traces.concat(spinTraces)
      }
      if (interactionTraces.length > 0) {
        traces = traces.concat(interactionTraces)
      }
      return traces
    },
    updateChartRanges () {
      let xmin = -1
      let xmax = 1
      let ymin = -1
      let ymax = 1
      let zmin = -1
      let zmax = 1
      for (const trace of this.chart.traces) {
        let xminTmp = Math.min(...trace.x) - 1
        let xmaxTmp = Math.max(...trace.x) + 1
        let yminTmp = Math.min(...trace.y) - 1
        let ymaxTmp = Math.max(...trace.y) + 1
        let zminTmp = Math.min(...trace.z) - 1
        let zmaxTmp = Math.max(...trace.z) + 1
        xmin = Math.min(xmin, xminTmp)
        xmax = Math.max(xmax, xmaxTmp)
        ymin = Math.min(ymin, yminTmp)
        ymax = Math.max(ymax, ymaxTmp)
        zmin = Math.min(zmin, zminTmp)
        zmax = Math.max(zmax, zmaxTmp)
      }
      this.chart.layout.scene.xaxis.range = [xmin, xmax]
      this.chart.layout.scene.yaxis.range = [ymin, ymax]
      this.chart.layout.scene.zaxis.range = [zmin, zmax]
    }
  },
  mounted () {
    plotly.plot(
      this.$refs[this.chart.uuid],
      this.chart.traces,
      this.chart.layout,
      {displaylogo: false})
  },

  watch: {
    chart: {
      handler: function () {
        plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout,
          {displaylogo: false}
        )
      },
      deep: true
    },
    interactions: {
      handler: function () {
        this.chart.traces = this.genTraces()
        this.updateChartRanges()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  #spinsys-canvas {
    border: 1px solid #ccc;
    margin: 2px;
  }

  .plot-area {
    height: 95%;
    width: 95%;
  }
</style>