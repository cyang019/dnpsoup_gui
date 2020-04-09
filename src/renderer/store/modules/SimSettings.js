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
      task_details: {}
    }
  },

  taskOptions: [
    { name: 'Eigen Values', task: 'EigenValues' },
    { name: 'Intensity', task: 'Intensity' },
    { name: 'Intensity Of Powder', task: 'PowderIntensity' },
    { name: 'Field Profile', task: 'FieldProfile' },
    { name: 'BuildUp', task: 'BuildUp' },
    { name: 'BuildUp Of Powder', task: 'PowderBuildUp' },
    { name: 'Scan1d', task: 'scan1d' },
    { name: 'Scan2d', task: 'scan2d' }
  ],
  refMagnets: loadDefaultMagnets(),

  hardware: {
    magnet: {
      b0: 3.35
    },

    gyrotron: {
      emFrequency: 94.1976e9
    },

    probe: {
      masFrequency: 0.0,
      temperature: 80.0,
      masIncrement: 1e-3,
      acq: 'H'
    }
  }
}

const getters = {

}

const mutations = {
  // task settings
  setNCores: (state, n) => (state.simulation.ncores = parseInt(n)),

  updateTaskName: (state, name) => {
    state.simulation.task.name = name.slice(0, name.length)
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
    state.hardware.probe.acq = acq.slice(0, acq.length)
  }
}

const actions = {
  // task settings
  setNumCores ({ commit }, n) {
    commit('setNCores', n)
  },
  setTaskName ({ commit }, name) {
    commit('updateTaskName', name)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
