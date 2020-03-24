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
    ...mapState('spinsys', {
      spins: 'state.spinys.spins'
    })
  },
  data () {
    return {
      chart: {
        uuid: '123',
        traces: [{
          x: [0.0],
          y: [0.0],
          z: [0.0],
          mode: 'markers',
          type: 'scatter3d',
          marker: {
            color: 'rgb(15, 0, 0)',
            size: 1
          }
        }],
        layout: {
          autosize: true,
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
      }
    }
  },

  mounted () {
    plotly.plot(this.$refs[this.chart.uuid], this.chart.traces, this.chart.layout)
  },

  watch: {
    chart: {
      handler: function () {
        plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout
        )
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