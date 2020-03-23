const state = {
  sample: {},

  simulation: {
    ncores: 1,
    task: {
      name: 'FieldProfile',
      task_details: {}
    }
  },

  hardware: {
    Magnet: {
      b0: 3.35
    },

    Gyrotron: {
      em_frequency: 94.1976e9
    },

    Probe: {
      mas_frequency: 0.0,
      temperature: 80.0,
      mas_increment: 1e-3,
      acq: 'H'
    }
  }
}

const getters = {

}

const mutations = {
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
