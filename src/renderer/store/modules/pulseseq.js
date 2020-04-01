const state = {
  increment: 1.0e-9,
  emrs: [],
  sections: [],
  sequence: [],
  channelOptions: ['e']
}

const getters = {
  getEmrs: state => state.emrs,
  getEmrByName: state => name => {
    return state.emrs.find(emr => emr.name === name)
  }
}

const mutations = {
  newEmr: (state, emr) => state.emrs.push(emr),
  removeEmrByName: (state, name) =>
    (state.emrs = state.emrs.filter(tmpEmr => tmpEmr.name !== name)),
  updateEmr: (state, emr) => {
    const index = state.emrs.findIndex(tmpEmr => tmpEmr.name === emr.name)
    if (index !== -1) {
      state.emrs.splice(index, 1, emr)
    } else {
      state.emrs.push(emr)
    }
  },
  resetPulseseq: (state) => {
    state.increment = 1.0e-9
    state.emrs = []
    state.sections = []
    state.sequence = []
  }
}

const actions = {
  addEmr ({ commit }, emr) {
    commit('newEmr', emr)
  },
  deleteEmrByName ({ commit }, name) {
    commit('removeEmrByName', name)
  },
  updateEmr ({ commit }, emr) {
    commit('updateEmr', emr)
  },
  resetPulseseq ({ commit }) {
    commit('resetPulseseq')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
