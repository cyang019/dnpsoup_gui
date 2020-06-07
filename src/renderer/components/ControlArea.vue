<template>
  <div id="control-area" class="d-flex flex-column">
    <p><strong>Execute Tasks</strong></p>
    <div class="d-flex flex-row justify-content-between">
      <button class="btn btn-secondary btn-md" @click="saveToFileClicked">
        Save to File
      </button>
      <button class="btn btn-secondary btn-md" @click="loadFromFileClicked">
        Load from File (In Development)
      </button>
      <button class="btn btn-secondary btn-md" @click="resetClicked">
        Reset
      </button>
      <button class="btn btn-primary btn-md disabled" @click="runClicked">
        <span>
          Run (Not Available)
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
      'increment', 'emrs', 'sections', 'sequence', 'name'
    ]),
    ...mapState('SimSettings', [
      'sample', 'simulation', 'hardware'
    ])
  },
  methods: {
    ...mapActions('spinsys', [
      'addSpin', 'addOneSpinInteraction', 'addTwoSpinInteraction', 'resetSpinsys',
      'setSpinsysEuler'
    ]),
    ...mapActions('pulseseq', [
      'setName', 'setIncrement',
      'addEmr', 'addSection', 'addSectionToSequence', 'resetPulseseq'
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
      'setMagneticField', 'setGyrotronFrequency',
      'setProbe', 'setMas', 'setTemperature',
      'setAcq',
      'resetSimSettings'
    ]),
    ...mapActions('SimSettings', {
      'setSimIncrement': state => state.setIncrement
    }),

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
        if (!interaction.hasOwnProperty('entries')) {
          // unknown interaction
          result.interactions.push(Object.assign({}, interaction))
        } else if (interaction.entries.hasOwnProperty('id1')) {
          // two spin interaction
          result.interactions.push(Object.assign({}, interaction))
        } else {
          // one spin interaction
          let tempInteraction = {
            name: interaction['name'],
            id: parseInt(interaction.id)
          }
          tempInteraction['entries'] = {
            x: parseFloat(interaction.entries.x),
            y: parseFloat(interaction.entries.y),
            z: parseFloat(interaction.entries.z),
            id: parseInt(interaction.entries.id),
            euler: {
              alpha: parseFloat(interaction.entries.euler.alpha) / 180.0 * Math.PI,
              beta: parseFloat(interaction.entries.euler.beta) / 180.0 * Math.PI,
              gamma: parseFloat(interaction.entries.euler.gamma) / 180.0 * Math.PI
            }
          }
          result.interactions.push(Object.assign({}, tempInteraction))
        }
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
        name: this.name,
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
      let spinsys = configurations['spinsys']
      let pulseseq = configurations['pulseseq']
      let settings = configurations['settings']
      this.populateSpinsys(spinsys)
      this.populatePulseseq(pulseseq)
      this.populateSettings(settings)
      this.$emit('require-sync-state', true)
      console.log('sync state emitted.')
    },
    populateSpinsys (spinsys) {
      this.resetSpinsys()
      let euler = {
        alpha: parseFloat(spinsys.euler.alpha) / Math.PI * 180.0,
        beta: parseFloat(spinsys.euler.beta) / Math.PI * 180.0,
        gamma: parseFloat(spinsys.euler.gamma) / Math.PI * 180.0
      }
      this.setSpinsysEuler(euler)
      for (const spinId in spinsys.spins) {
        let spin = {
          id: parseInt(spinId),
          x: parseFloat(spinsys.spins[spinId].x),
          y: parseFloat(spinsys.spins[spinId].y),
          z: parseFloat(spinsys.spins[spinId].z),
          spinType: spinsys.spins[spinId].type,
          t1: parseFloat(spinsys.spins[spinId].t1),
          t2: parseFloat(spinsys.spins[spinId].t2)
        }
        this.addSpin(spin)
      }
      for (const interaction of spinsys.interactions) {
        switch (interaction.name) {
          case 'shielding': case 'Shielding': case 'csa' : case 'CSA':
            let temp1 = {
              name: interaction.name.toLowerCase(),
              tensor: {
                x: parseFloat(interaction.entries.x),
                y: parseFloat(interaction.entries.y),
                z: parseFloat(interaction.entries.z)
              },
              spinId: parseInt(interaction.entries.id),
              euler: {
                alpha: parseFloat(interaction.entries.euler.alpha) / Math.PI * 180.0,
                beta: parseFloat(interaction.entries.euler.beta) / Math.PI * 180.0,
                gamma: parseFloat(interaction.entries.euler.gamma) / Math.PI * 180.0
              }
            }
            this.addOneSpinInteraction(temp1)
            break
          default:
            let temp2 = {
              name: interaction.name.toLowerCase(),
              spinId1: parseInt(interaction.entries.id1),
              spinId2: parseInt(interaction.entries.id2)
            }
            if (interaction.entries.hasOwnProperty('value')) {
              temp2['value'] = parseFloat(interaction.entries.value)
            }
            this.addTwoSpinInteraction(temp2)
            break
        }
      }
    },
    populatePulseseq (pulseseq) {
      this.resetPulseseq()
      if (pulseseq.hasOwnProperty('name')) {
        this.setName(pulseseq.name)
      } else {
        this.setName('Default')
      }
      this.setIncrement(parseFloat(pulseseq.increment))
      for (const compName in pulseseq.components) {
        let tempEmr = {
          name: compName,
          channels: []
        }
        for (const channelName in pulseseq.components[compName]) {
          let tempChannel = {
            frequency: parseFloat(pulseseq.components[compName][channelName].frequency),
            offset: parseFloat(pulseseq.components[compName][channelName].offset),
            phase: parseFloat(pulseseq.components[compName][channelName].phase),
            spinType: channelName
          }
          tempEmr.channels.push(tempChannel)
        }
        this.addEmr(tempEmr)
      }
      for (const secName in pulseseq.sections) {
        let tempSection = Object.assign({}, pulseseq.sections.secName)
        tempSection['name'] = secName
        this.addSection(tempSection)
      }
      for (const subseq of pulseseq.sequence) {
        this.addSectionToSequence(subseq)
      }
    },
    populateSettings (settings) {
      this.resetSimSettings()
      let tempSimEuler = {
        alpha: parseFloat(settings.euler.alpha) / Math.PI * 180.0,
        beta: parseFloat(settings.euler.beta) / Math.PI * 180.0,
        gamma: parseFloat(settings.euler.gamma) / Math.PI * 180.0
      }
      this.setSampleEuler(tempSimEuler)
      if (settings.hasOwnProperty('euler_scheme')) {
        this.setEulerPowderOption('zcw')
        this.setEulerZCWValue(parseInt(settings.euler_scheme.zcw))
      } else if (settings.hasOwnProperty('eulers')) {
        this.setEulerPowderOption('eulers')
        for (const tempPowderEuler of settings.eulers) {
          let tempPowderEulerDegree = {
            alpha: parseFloat(tempPowderEuler.alpha) / Math.PI * 180.0,
            beta: parseFloat(tempPowderEuler.beta) / Math.PI * 180.0,
            gamma: parseFloat(tempPowderEuler.gamma) / Math.PI * 180.0
          }
          this.addEuler(tempPowderEulerDegree)
        }
      }
      this.setNumCores(parseInt(settings.ncores))
      this.setAcq(settings.acq)
      this.setTaskName(settings.task)
      // console.log(`settings.task: ${settings.task}`)
      if (settings.hasOwnProperty('Magnet')) {
        this.setMagneticField(parseFloat(settings.Magnet.b0))
      }
      if (settings.hasOwnProperty('Gyrotron')) {
        this.setGyrotronFrequency(parseFloat(settings.Gyrotron.em_frequency))
      }
      this.setSimIncrement(parseFloat(settings.Probe.mas_increment))
      this.setTemperature(parseFloat(settings.Probe.temperature))
      this.setMas(parseFloat(settings.Probe.mas_frequency))
      switch (settings.task) {
        case 'FieldProfile':
          if (settings.hasOwnProperty('field range')) {
            this.setFieldRangeBegin(parseFloat(settings['field range'].begin))
            this.setFieldRangeEnd(parseFloat(settings['field range'].end))
            this.setFieldRangeStep(parseFloat(settings['field range'].step))
          } else if (settings.hasOwnProperty('emr range')) {
            this.setEmrRangeBegin(parseFloat(settings['emr range'].begin))
            this.setEmrRangeEnd(parseFloat(settings['emr range'].end))
            this.setEmrRangeStep(parseFloat(settings['emr range'].step))
          }
          break
        case 'scan1d': case 'Scan1d':
          this.setScanType(settings['task details'].type)
          this.setScanName(settings['task details'].name)
          this.setScanRangeBegin(parseFloat(settings['task details'].range.begin))
          this.setScanRangeEnd(parseFloat(settings['task details'].range.end))
          this.setScanRangeStep(parseFloat(settings['task details'].range.step))
          if (settings['task details'].hasOwnProperty('spin')) {
            this.setScanSpin(settings['task details'].spin)
          }
          break
        case 'scan2d': case 'Scan2d':
          this.setScanType1(settings['task details'].type1)
          this.setScanName1(settings['task details'].name1)
          this.setScanRange1Begin(parseFloat(settings['task details'].range1.begin))
          this.setScanRange1End(parseFloat(settings['task details'].range1.end))
          this.setScanRange1Step(parseFloat(settings['task details'].range1.step))
          if (settings['task details'].hasOwnProperty('spin1')) {
            this.setScanSpin1(settings['task details'].spin1)
          }
          this.setScanType2(settings['task details'].type2)
          this.setScanName2(settings['task details'].name2)
          this.setScanRange2Begin(parseFloat(settings['task details'].range2.begin))
          this.setScanRange2End(parseFloat(settings['task details'].range2.end))
          this.setScanRange2Step(parseFloat(settings['task details'].range2.step))
          if (settings['task details'].hasOwnProperty('spin2')) {
            this.setScanSpin(settings['task details'].spin2)
          }
          break
        default:
          break
      }
      if (settings.hasOwnProperty('field range')) {
        this.setFieldRangeBegin(parseFloat(settings['field range'].begin))
        this.setFieldRangeEnd(parseFloat(settings['field range'].end))
        this.setFieldRangeStep(parseFloat(settings['field range'].step))
      } else if (settings.hasOwnProperty('emr range')) {
        this.setEmrRangeBegin(parseFloat(settings['emr range'].begin))
        this.setEmrRangeEnd(parseFloat(settings['emr range'].end))
        this.setEmrRangeStep(parseFloat(settings['emr range'].step))
      }
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
    resetClicked () {
      this.resetSpinsys()
      this.resetPulseseq()
      this.resetSimSettings()
      this.$emit('require-sync-state', true)
    },
    runClicked () {
      console.log('Not Implemented Yet.')
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
