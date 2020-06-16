import magnets from './hardwares/magnet'

function loadDefaultMagnets () {
  let defaultMagnets = []
  for (let magnet of magnets) {
    defaultMagnets.push(Object.assign({}, magnet))
  }
  return defaultMagnets
}

const state = {
  sample: {
    euler: {
      alpha: 0.0,
      beta: 0.0,
      gamma: 0.0
    },
    eulerOption: '',
    eulerScheme: {
      zcw: 0
    },
    eulers: []
  },

  simulation: {
    ncores: 1,
    task: {
      name: 'Default',
      taskDetails: {
        // for field profile
        emrRange: {
          begin: 0,
          end: 0,
          step: 0
        },
        emrs: [],
        fieldRange: {
          begin: 0,
          end: 0,
          step: 0
        },
        fields: [],

        // scans
        scanTypes: [
          'GammaB1', 'EmrPhase', 'EmrLength'
        ],
        // for scan1d
        type: '',
        spin: '',
        name: '',
        range: {
          begin: 0,
          end: 0,
          step: 0
        },

        // for scan2d
        type1: '',
        spin1: '',
        name1: '',
        range1: {
          begin: 0,
          end: 0,
          step: 0
        },
        type2: '',
        spin2: '',
        name2: '',
        range2: {
          begin: 0,
          end: 0,
          step: 0
        }
      }
    }
  },

  taskCandidates: [
    'EigenValues', 'Intensity', 'BuildUp',
    'PowderIntensity', 'PowderBuildUpEnhancement',
    'FieldProfile', 'Scan1d',
    'Scan2d'
  ],
  tasksSingleton: [
    'EigenValues', 'Intensity', 'BuildUp'
  ],
  tasksComposite: [
    'PowderIntensity', 'PowderBuildUpEnhancement'
  ],
  tasks1d: [
    'FieldProfile', 'Scan1d'
  ],
  tasks2d: [
    'Scan2d'
  ],

  taskOptions: [
    { name: 'Eigen Values', task: 'EigenValues' },
    { name: 'Intensity', task: 'Intensity' },
    { name: 'Powder Intensity', task: 'PowderIntensity' },
    { name: 'Field Profile', task: 'FieldProfile' },
    { name: 'BuildUp', task: 'BuildUp' },
    { name: 'Powder BuildUp', task: 'PowderBuildUpEnhancement' },
    { name: 'Scan1d', task: 'scan1d' },
    { name: 'Scan2d', task: 'scan2d' }
  ],
  refMagnets: loadDefaultMagnets(),

  hardware: {
    magnet: {
      b0: 0
    },

    gyrotron: {
      emFrequency: 0
    },

    probe: {
      masFrequency: 0.0,
      temperature: 77.0,
      masIncrement: 1e-6,
      acq: 'H1'
    }
  },

  syncStateRequired: false
}

const getters = {
  getB0: state => state.hardware.magnet.b0,
  getEmFreq: state => state.hardware.gyrotron.emFrequency,
  getMas: state => state.hardware.probe.masFrequency,
  getTemperature: state => state.hardware.probe.temperature,
  getMasInc: state => state.hardware.probe.masIncrement,
  getAcq: state => state.hardware.probe.acq,
  getXtalEuler: state => state.sample.euler,
  getPowderOption: state => state.sample.eulerOption,
  getEulerSchemeZcw: state => state.sample.eulerScheme.zcw,
  getEulers: state => state.sample.eulers,
  getTaskName: state => state.simulation.task.name,
  getFieldProfileScanOption: state => {
    if (state.simulation.task.name !== 'FieldProfile') {
      return ''
    } else {
      if (state.simulation.task.taskDetails.emrRange.begin !== 0 ||
        state.simulation.task.taskDetails.emrRange.end !== 0 ||
        state.simulation.task.taskDetails.emrRange.step !== 0) {
        return 'emr'
      } else {
        return 'b0'
      }
    }
  },
  getNumCores: state => state.simulation.ncores,
  getFieldProfileRange: state => {
    if (state.simulation.task.name !== 'FieldProfile') {
      return {begin: 0, end: 0, step: 0}
    } else {
      if (state.simulation.task.taskDetails.emrRange.begin !== 0 ||
        state.simulation.task.taskDetails.emrRange.end !== 0 ||
        state.simulation.task.taskDetails.emrRange.step !== 0) {
        return state.simulation.task.taskDetails.emrRange
      } else {
        return state.simulation.task.taskDetails.fieldRange
      }
    }
  }
}

const mutations = {
  resetSimSettings: (state) => {
    state.sample = {
      euler: {
        alpha: 0.0,
        beta: 0.0,
        gamma: 0.0
      },
      eulerOption: '',
      eulerScheme: {
        zcw: 0
      },
      eulers: []
    }
    state.simulation = {
      ncores: 1,
      task: {
        name: 'Default',
        taskDetails: {
          // for field profile
          emrRange: {
            begin: 0,
            end: 0,
            step: 0
          },
          emrs: [],
          fieldRange: {
            begin: 0,
            end: 0,
            step: 0
          },
          fields: [],

          // scans
          scanTypes: [
            'GammaB1', 'EmrPhase', 'EmrLength'
          ],
          // for scan1d
          type: '',
          spin: '',
          name: '',
          range: {
            begin: 0,
            end: 0,
            step: 0
          },

          // for scan2d
          type1: '',
          spin1: '',
          name1: '',
          range1: {
            begin: 0,
            end: 0,
            step: 0
          },
          type2: '',
          spin2: '',
          name2: '',
          range2: {
            begin: 0,
            end: 0,
            step: 0
          }
        }
      }
    }
    state.hardware = {
      magnet: {
        b0: 3.35
      },
      gyrotron: {
        emFrequency: 94.1976e9
      },
      probe: {
        masFrequency: 0.0,
        temperature: 80.0,
        masIncrement: 1e-6,
        acq: 'H1'
      }
    }
  },

  // task settings
  setNCores: (state, n) => (state.simulation.ncores = parseInt(n)),

  setTaskName: (state, name) => {
    state.simulation.task.name = name
  },

  setTaskNameByValue: (state, value) => {
    for (const key in state.taskOptions) {
      if (state.taskOptions[key] === value) {
        state.simulation.task.name = key
        return
      }
    }
    state.simulation.task.name = ''
  },

  setEmrRange: (state, value) => {
    state.simulation.task.taskDetails.fieldRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.emrRange.begin = parseFloat(value.begin)
    state.simulation.task.taskDetails.emrRange.end = parseFloat(value.end)
    state.simulation.task.taskDetails.emrRange.step = parseFloat(value.step)
  },

  setEmrRangeBegin: (state, value) => {
    state.simulation.task.taskDetails.fieldRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.emrRange.begin = parseFloat(value)
  },

  setEmrRangeEnd: (state, value) => {
    state.simulation.task.taskDetails.fieldRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.emrRange.end = parseFloat(value)
  },

  setEmrRangeStep: (state, value) => {
    state.simulation.task.taskDetails.fieldRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.emrRange.step = parseFloat(value)
  },

  setFieldRange: (state, value) => {
    state.simulation.task.taskDetails.emrRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.fieldRange.begin = parseFloat(value.begin)
    state.simulation.task.taskDetails.fieldRange.end = parseFloat(value.end)
    state.simulation.task.taskDetails.fieldRange.step = parseFloat(value.step)
  },

  setFieldRangeBegin: (state, value) => {
    state.simulation.task.taskDetails.emrRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.fieldRange.begin = parseFloat(value)
  },

  setFieldRangeEnd: (state, value) => {
    state.simulation.task.taskDetails.emrRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.fieldRange.end = parseFloat(value)
  },

  setFieldRangeStep: (state, value) => {
    state.simulation.task.taskDetails.emrRange = {
      begin: 0,
      end: 0,
      step: 0
    }
    state.simulation.task.taskDetails.fieldRange.step = parseFloat(value)
  },

  setScanType: (state, t) => {
    state.simulation.task.taskDetails.type = t.slice(0, t.length)
  },

  setScanType1: (state, t) => {
    state.simulation.task.taskDetails.type1 = t.slice(0, t.length)
  },

  setScanType2: (state, t) => {
    state.simulation.task.taskDetails.type2 = t.slice(0, t.length)
  },

  setScanSpin: (state, spin) => {
    state.simulation.task.taskDetails.spin = spin.slice(0, spin.length)
  },

  setScanSpin1: (state, spin) => {
    state.simulation.task.taskDetails.spin1 = spin.slice(0, spin.length)
  },

  setScanSpin2: (state, spin) => {
    state.simulation.task.taskDetails.spin2 = spin.slice(0, spin.length)
  },

  setScanName: (state, name) => {
    state.simulation.task.taskDetails.name = name.slice(0, name.length)
  },

  setScanName1: (state, name) => {
    state.simulation.task.taskDetails.name1 = name.slice(0, name.length)
  },

  setScanName2: (state, name) => {
    state.simulation.task.taskDetails.name2 = name.slice(0, name.length)
  },

  setScanRangeBegin: (state, value) => {
    state.simulation.task.taskDetails.range.begin = parseFloat(value)
  },

  setScanRangeEnd: (state, value) => {
    state.simulation.task.taskDetails.range.end = parseFloat(value)
  },

  setScanRangeStep: (state, value) => {
    state.simulation.task.taskDetails.range.step = parseFloat(value)
  },

  setScanRange1Begin: (state, value) => {
    state.simulation.task.taskDetails.range1.begin = parseFloat(value)
  },

  setScanRange1End: (state, value) => {
    state.simulation.task.taskDetails.range1.end = parseFloat(value)
  },

  setScanRange1Step: (state, value) => {
    state.simulation.task.taskDetails.range1.step = parseFloat(value)
  },

  setScanRange2Begin: (state, value) => {
    state.simulation.task.taskDetails.range2.begin = parseFloat(value)
  },

  setScanRange2End: (state, value) => {
    state.simulation.task.taskDetails.range2.end = parseFloat(value)
  },

  setScanRange2Step: (state, value) => {
    state.simulation.task.taskDetails.range2.step = parseFloat(value)
  },

  // sample settings
  setXtalEulerAlpha: (state, a) => {
    state.sample.euler.alpha = parseFloat(a)
  },
  setXtalEulerBeta: (state, b) => {
    state.sample.euler.beta = parseFloat(b)
  },
  setXtalEulerGamma: (state, g) => {
    state.sample.euler.gamma = parseFloat(g)
  },

  setSampleEuler: (state, euler) => {
    state.sample.euler = Object.assign({}, euler)
  },
  setEulerPowderOption: (state, option) => {
    state.sample.eulerOption = option.slice(0, option.length)
  },
  setEulerZCWValue: (state, value) => {
    state.sample.eulerScheme.zcw = parseInt(value)
  },
  appendEuler: (state, euler) => {
    state.sample.eulers.push(Object.assign({}, euler))
  },
  removeEuler: (state, eulerId) => {
    state.sample.eulers = state.sample.eulers.filter(euler => euler.id !== eulerId)
  },

  // hardware settings
  setB0: (state, b0) => {
    state.hardware.magnet.b0 = parseFloat(b0)
  },
  setGyrotronFreq: (state, freq) => {
    state.hardware.gyrotron.emFrequency = parseFloat(freq)
  },
  setProbe: (state, probe) => {
    state.hardware.probe = Object.assign({}, probe)
  },
  setMas: (state, freq) => {
    state.hardware.probe.masFrequency = parseFloat(freq)
  },
  setTemperature: (state, temp) => {
    state.hardware.probe.temperature = parseFloat(temp)
  },
  setIncrement: (state, inc) => {
    state.hardware.probe.masIncrement = parseFloat(inc)
  },
  setAcq: (state, acq) => {
    state.hardware.probe.acq = acq
  },
  setSyncStateRequired: (state, val) => {
    state.syncStateRequired = val
  }
}

const actions = {
  // task settings
  setNumCores ({ commit }, n) {
    commit('setNCores', n)
  },
  setTaskName ({ commit }, name) {
    commit('setTaskName', name)
  },
  setTaskNameByValue ({ commit }, name) {
    commit('setTaskNameByValue', name)
  },
  setEmrRange ({ commit }, value) {
    commit('setEmrRange', value)
  },
  setEmrRangeBegin ({ commit }, value) {
    commit('setEmrRangeBegin', value)
  },
  setEmrRangeEnd ({ commit }, value) {
    commit('setEmrRangeEnd', value)
  },
  setEmrRangeStep ({ commit }, value) {
    commit('setEmrRangeStep', value)
  },
  setFieldRange ({ commit }, value) {
    commit('setFieldRange', value)
  },
  setFieldRangeBegin ({ commit }, value) {
    commit('setFieldRangeBegin', value)
  },
  setFieldRangeEnd ({ commit }, value) {
    commit('setFieldRangeEnd', value)
  },
  setFieldRangeStep ({ commit }, value) {
    commit('setFieldRangeStep', value)
  },
  setScanType ({ commit }, t) {
    commit('setScanType', t)
  },
  setScanType1 ({ commit }, t) {
    commit('setScanType1', t)
  },
  setScanType2 ({ commit }, t) {
    commit('setScanType2', t)
  },
  setScanSpin ({ commit }, spin) {
    commit('setScanSpin', spin)
  },
  setScanSpin1 ({ commit }, spin) {
    commit('setScanSpin1', spin)
  },
  setScanSpin2 ({ commit }, spin) {
    commit('setScanSpin2', spin)
  },
  setScanName ({ commit }, name) {
    commit('setScanName', name)
  },
  setScanName1 ({ commit }, name) {
    commit('setScanName1', name)
  },
  setScanName2 ({ commit }, name) {
    commit('setScanName2', name)
  },
  setScanRangeBegin ({ commit }, value) {
    commit('setScanRangeBegin', value)
  },
  setScanRangeEnd ({ commit }, value) {
    commit('setScanRangeEnd', value)
  },
  setScanRangeStep ({ commit }, value) {
    commit('setScanRangeStep', value)
  },
  setScanRange1Begin ({ commit }, value) {
    commit('setScanRange1Begin', value)
  },
  setScanRange1End ({ commit }, value) {
    commit('setScanRange1End', value)
  },
  setScanRange1Step ({ commit }, value) {
    commit('setScanRange1Step', value)
  },
  setScanRange2Begin ({ commit }, value) {
    commit('setScanRange2Begin', value)
  },
  setScanRange2End ({ commit }, value) {
    commit('setScanRange2End', value)
  },
  setScanRange2Step ({ commit }, value) {
    commit('setScanRange2Step', value)
  },

  // sample settings
  setXtalEulerAlpha ({ commit }, a) {
    commit('setXtalEulerAlpha', a)
  },
  setXtalEulerBeta ({ commit }, b) {
    commit('setXtalEulerBeta', b)
  },
  setXtalEulerGamma ({ commit }, g) {
    commit('setXtalEulerGamma', g)
  },
  setSampleEuler ({ commit }, euler) {
    commit('setSampleEuler', euler)
  },
  setEulerPowderOption ({ commit }, option) {
    commit('setEulerPowderOption', option)
  },
  setEulerZCWValue ({ commit }, value) {
    commit('setEulerZCWValue', value)
  },
  addEuler ({ commit }, euler) {
    commit('appendEuler', euler)
  },
  removeEuler ({ commit }, eulerId) {
    commit('removeEuler', eulerId)
  },

  // hardware settings
  setMagneticField ({ commit }, b0) {
    commit('setB0', b0)
  },
  setGyrotronFrequency ({ commit }, freq) {
    commit('setGyrotronFreq', freq)
  },
  setProbe ({ commit }, probe) {
    commit('setProbe', probe)
  },
  setMas ({ commit }, freq) {
    commit('setMas', freq)
  },
  setTemperature ({ commit }, temperature) {
    commit('setTemperature', temperature)
  },
  setIncrement ({ commit }, inc) {
    commit('setIncrement', inc)
  },
  setAcq ({ commit }, acq) {
    commit('setAcq', acq)
  },
  resetSimSettings ({ commit }) {
    commit('resetSimSettings')
  },
  setSyncStateRequired ({ commit }, val) {
    commit('setSyncStateRequired', val)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
