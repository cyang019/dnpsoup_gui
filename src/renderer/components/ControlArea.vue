<template>
  <div id="control-area" class="d-flex flex-column">
    <p><strong>Execute Tasks</strong></p>
    <div class="d-flex flex-row justify-content-between">
      <button class="btn btn-secondary btn-md" @click="saveToFileClicked">
        Save to File
      </button>
      <button class="btn btn-secondary btn-md" @click="loadFromFileClicked">
        Load from File
      </button>
      <button class="btn btn-primary btn-md" @click="runClicked">
        <span>
          Run
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const { dialog } = require('electron').remote
const fs = require('fs')

export default {
  name: 'control-area',
  computed: {
    ...mapState('spinsys', ['euler', 'spins', 'interactions']),
    ...mapState('pulseseq', [
      'increment', 'emrs', 'sections', 'sequence'
    ]),
    ...mapState('SimSettings', [
      'sample', 'simulation', 'hardware'
    ])
  },
  methods: {
    ...mapActions('spinsys', [
      'addSpin', 'addOneSpinInteraction', 'addTwoSpinInteraction', 'resetSpinsys'
    ]),
    ...mapActions('pulseseq', [
      'setName', 'addEmr', 'addSection', 'addSectionToSequence', 'resetPulseseq'
    ]),
    ...mapActions('SimSettings', [
      'setNumCores', 'setTaskName',
      'setEmrRangeBegin', 'setEmrRangeEnd', 'setEmrRangeStep',
      'setFieldRangeBegin', 'setFieldRangeEnd', 'setFieldRangeStep',
      'setScanType', 'setScanType1', 'setScanType2',
      'setScanSpin', 'setScanSpin1', 'setScanSpin2',
      'setScanName', 'setScanName1', 'setScanName2',
      'setScanRangeBegin', 'setScanRangeEnd', 'setScanRangeStep',
      'setScanRange1Begin', 'setScanRange1End', 'setScanRange1Step',
      'setScanRange2Begin', 'setScanRange2End', 'setScanRange2Step',
      'setXtalEulerAlpha', 'setXtalEulerBeta', 'setXtalEulerGamma',
      'setSampleEuler', 'setEulerPowderOption', 'setEulerZCWValue', 'addEuler',
      'setMagneticField', 'setGyrotronFrequency', 'setProbe', 'setMas', 'setTemperature',
      'setIncrement', 'setAcq'
    ]),

    prepareSpinsysOutput () {
      let result = {
        euler: {
          alpha: parseFloat(this.euler.alpha) / 180.0 * Math.PI,
          beta: parseFloat(this.euler.beta) / 180.0 * Math.PI,
          gamma: parseFloat(this.euler.gamma) / 180.0 * Math.PI
        },
        interactions: [],
        spins: {},
        irradiation: []
      }
      for (const spin of this.spins) {
        let tempSpin = {
          type: spin.spinType,
          x: spin.x,
          y: spin.y,
          z: spin.z,
          t1: parseFloat(spin.t1),
          t2: parseFloat(spin.t2)
        }
        result.spins[spin.id] = Object.assign({}, tempSpin)
      }
      for (const interaction of this.interactions) {
        result.interactions.push(Object.assign({}, interaction))
      }
      for (const emr of this.emrs) {
        for (const channel of emr.channels) {
          let channelName = channel.spinType
          if (!result.irradiation.includes(channelName)) {
            result.irradiation.push(channelName)
          }
        }
      }
      return result
    },
    preparePulseseqOutput () {
      let result = {
        increment: parseFloat(this.increment),
        components: {},
        sections: {},
        sequence: Object.assign([], this.sequence)
      }
      for (const emr of this.emrs) {
        let emrContent = {}
        for (const channel of emr.channels) {
          let tempChannel = {
            frequency: parseFloat(channel.frequency),
            phase: parseFloat(channel.phase),
            offset: parseFloat(channel.offset)
          }
          emrContent[channel.spinType] = tempChannel
        }
        result.components[emr.name] = emrContent
      }
      for (const section of this.sections) {
        let sectionContent = {
          type: section.type,
          size: section.size,
          names: Object.assign([], section.names),
          params: Object.assign({}, section.params)
        }
        if (section.hasOwnProperty('phase0')) {
          sectionContent['phase0'] = Object.assign({}, section.phase0)
        }
        result.sections[section.name] = sectionContent
      }
      return result
    },
    prepareSettingsOutput () {
      let result = {
        euler: {
          alpha: parseFloat(this.sample.euler.alpha) / 180.0 * Math.PI,
          beta: parseFloat(this.sample.euler.beta) / 180.0 * Math.PI,
          gamma: parseFloat(this.sample.euler.gamma) / 180.0 * Math.PI
        },
        ncores: parseInt(this.simulation.ncores),
        acq: this.hardware.probe.acq,
        Magnet: {
          b0: parseFloat(this.hardware.magnet.b0)
        },
        Gyrotron: {
          em_frequency: parseFloat(this.hardware.gyrotron.emFrequency)
        },
        Probe: {
          mas_frequency: parseFloat(this.hardware.probe.masFrequency),
          temperature: parseFloat(this.hardware.probe.temperature),
          mas_increment: parseFloat(this.hardware.probe.masIncrement)
        },
        task: this.simulation.task.name
      }
      if (['zcw', 'eulers'].includes(this.sample.eulerOption)) {
        if (this.sample.eulerOption === 'zcw') {
          result['euler_scheme'] = {
            zcw: parseInt(this.sample.eulerScheme.zcw)
          }
        } else {
          result.eulers = []
          for (const euler of this.sample.eulers) {
            let tempEuler = {
              alpha: parseFloat(euler.alpha) / 180.0 * Math.PI,
              beta: parseFloat(euler.beta) / 180.0 * Math.PI,
              gamma: parseFloat(euler.gamma) / 180.0 * Math.PI
            }
            result.eulers.push(tempEuler)
          }
        }
      }
      switch (result.task) {
        case 'EigenValues':
          break
        case 'BuildUp':
          break
        case 'Intensity':
          break
        case 'PowderIntensity':
          break
        case 'PowderBuildUp':
          break
        case 'FieldProfile':
          if (this.simulation.task.taskDetails.fieldRange.begin === 0 &&
            this.simulation.task.taskDetails.fieldRange.end === 0 &&
            this.simulation.task.taskDetails.fieldRange.step === 0
          ) {
            result['emr range'] = Object.assign(
              {}, this.simulation.task.taskDetails.emrRange
            )
          } else {
            result['field range'] = Object.assign(
              {}, this.simulation.task.taskDetails.fieldRange
            )
          }
          break
        case 'scan1d':
          result['task details'] = {
            type: this.simulation.task.taskDetails.type,
            spin: this.simulation.task.taskDetails.spin,
            name: this.simulation.task.taskDetails.name,
            range: Object.assign({}, this.simulation.task.taskDetails.range)
          }
          break
        case 'scan2d':
          result['task details'] = {
            type1: this.simulation.task.taskDetails.type1,
            spin1: this.simulation.task.taskDetails.spin1,
            name1: this.simulation.task.taskDetails.name1,
            range1: Object.assign({}, this.simulation.task.taskDetails.range1),
            type2: this.simulation.task.taskDetails.type2,
            spin2: this.simulation.task.taskDetails.spin2,
            name2: this.simulation.task.taskDetails.name2,
            range2: Object.assign({}, this.simulation.task.taskDetails.range2)
          }
          break
        default:
          break
      }
      return result
    },
    prepareOutput () {
      const spinsysStr = this.prepareSpinsysOutput()
      const pulseseqStr = this.preparePulseseqOutput()
      const settingsStr = this.prepareSettingsOutput()
      let result = {
        spinsys: spinsysStr,
        pulseseq: pulseseqStr,
        settings: settingsStr
      }
      return JSON.stringify(result, null, 2)
    },
    prepareInput (content) {
      let configurations = JSON.parse(content)
      console.log(`prepareInput: ${configurations}`)
    },
    saveToFileClicked () {
      let content = this.prepareOutput()
      dialog.showSaveDialog({}
      ).then(result => {
        let filename = result.filePath
        if (filename === undefined) {
          // nothing created
          return
        }
        fs.writeFile(filename, content, (err) => {
          if (err) {
            console.log('an error ocurred with file creation ' + err.message)
          }
        })
      }).catch(err => {
        alert(err)
      })
    },
    loadFromFileClicked () {
      dialog.showOpenDialog({}
      ).then(
        result => {
          let filepath = result.filePaths[0]
          fs.readFile(filepath, (err, data) => {
            if (err) {
              console.log(err)
            }
            this.prepareInput(data)
          })
        }
      )
    },
    runClicked () {

    }
  }
}
</script>

<style scoped>
  #control-area {
    margin: 2px;
    border: 1px solid #aaa;
  }
</style>
