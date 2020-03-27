function initDefaultState () {
  return {
    euler: {
      alpha: 0.0,
      beta: 0.0,
      gamma: 0.0
    },
    interactions: [],
    irradiation: [],
    spins: [],
    spinIds: [],

    spinId: 0,
    interactionId: 0
  }
}

const state = initDefaultState()

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
    state.spinIds.push(spin.id)
  },
  deleteSpin: (state, spinId) => {
    state.spins = state.spins.filter(spin => spin.id !== spinId)
    state.spinIds = state.spinIds.filter(value => value !== spinId)
  },
  newInteraction: (state, prop) => {
    if (['csa', 'shielding', 'hyperfine', 'dipole'].includes(prop.name)) {
      switch (prop.name) {
        case 'csa': case 'shielding':
          if (state.spinIds.includes(prop.entries.id)) {
            state.interactions.push(prop)
          }
          break
        case 'dipole': case 'hyperfine':
          if (state.spinIds.includes(prop.entries.id1) &&
            state.spinIds.includes(prop.entries.id2)) {
            state.interactions.push(prop)
          }
          break
        default:
          break
      }
    }
  },
  deleteInteraction: (state, interactionId) => {
    state.interactions = state.interactions.filter(interaction => interaction.interactionId !== interactionId)
  },
  resetSpinsys: (state) => {
    state.euler = {alpha: 0.0, beta: 0.0, gamma: 0.0}
    state.spins = []
    state.spinIds = []
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
  removeSpin ({ commit }, spinId) {
    commit('deleteSpin', spinId)
  },
  addInteraction ({ commit }, interaction) {
    commit('newInteraction', interaction)
  },
  removeInteraction ({ commit }, interactionId) {
    commit('deleteInteraction', interactionId)
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
