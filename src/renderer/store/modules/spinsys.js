const state = {
  euler: {
    alpha: 0.0,
    beta: 0.0,
    gamma: 0.0
  },
  interactions: [],
  irradiation: [],
  spins: []
}

const getters = {
  getSpins: state => state.spins,
  getInteractions: state => state.interactions
}

/* eslint-disable no-unused-vars */

const mutations = {
  newSpin: (state, spin) => {
    state.spins.push(spin)
  },
  newInteraction: (state, prop) => {
    if (['csa', 'shielding', 'hyperfine', 'dipole'].includes(prop.name.toLowerCase())) {
      prop.name = prop.name.toLowerCase()
      switch (prop.name) {
        case 'csa': case 'shielding':
          if (state.spinids.includes(prop.entries.id)) {
            state.interactions.push(prop)
          }
          break
        case 'dipole': case 'hyperfine':
          if (state.spinids.includes(prop.entries.id1) &&
            state.spinids.includes(prop.entries.id2)) {
            state.interactions.push(prop)
          }
          break
        default:
          break
      }
    }
  },
  resetSpinsys: (state) => {
    state.euler = {alpha: 0.0, beta: 0.0, gamma: 0.0}
    state.spins = []
    state.interactions = []
    state.irradiation = []
  }
}

const actions = {
  addSpin ({ commit }, payload) {
    commit('newSpin', payload)
  },
  addInteraction ({ commit }, interaction) {
    commit('newInteraction', interaction)
  },
  resetSpinsys ({ commit }) {
    commit('resetSpinsys')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
