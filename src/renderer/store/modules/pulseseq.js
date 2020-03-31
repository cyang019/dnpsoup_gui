const state = {
  increment: 1.0e-9,
  emrs: [],
  sections: [],
  sequence: []
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
    }
  }
}

const actions = {
  addEmr ({ commit }, emr) {
    commit('newEmr', emr)
  },
  deleteEmr ({ commit }, name) {
    commit('removeEmr', name)
  },
  updateEmr ({ commit }, emr) {
    commit('updateEmr', emr)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
