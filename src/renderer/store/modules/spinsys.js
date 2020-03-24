const state = {
  euler: {
    alpha: 0.0,
    beta: 0.0,
    gamma: 0.0
  },
  interactions: [],
  irradiation: [],
  spins: [],
  spinids: [],

  spinId: 0,
  interactionId: 0
}

const getters = {
  getSpinId: state => state.spinId,
  getInteractionId: state => state.interactionId,
  getSpins: state => state.spins,
  getInteractions: state => state.interactions
}

/* eslint-disable no-unused-vars */

const mutations = {
  newSpin: (state, spin) => {
    state.spins.push(spin)
    state.spinids.push(spin.id)
  },
  newInteraction: (state, prop) => {
    if (['csa', 'shielding', 'hyperfine', 'dipole'].includes(prop.name)) {
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
    state.spinids = []
    state.interactions = []
    state.irradiation = []
    state.spinId = 0
    state.interactionId = 0
  },
  incSpinId: (state) => {
    ++state.spinId
  },
  incInteractionId: (state) => {
    ++state.interactionId
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
  },
  incrementSpinId ({ commit }) {
    commit('incSpinId')
  },
  incrementInteractionId ({ commit }) {
    commit('incInteractionId')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
