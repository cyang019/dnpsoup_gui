import defaultEllipsoidAngles from './angles/ellipsoid'

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
    interactionId: 0,

    defaultEllipsoidAngles: defaultEllipsoidAngles
  }
}

function idNotInEntries (entries, spinId) {
  if (entries.hasOwnProperty('id')) {
    return entries.id !== spinId
  } else {
    return entries.id1 !== spinId && entries.id2 !== spinId
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
    state.interactions = state.interactions.filter(
      interaction => idNotInEntries(interaction.entries, spinId)
    )
  },
  updateSpin: (state, spin) => {
    const index = state.spins.findIndex(tmpSpin => tmpSpin.id === spin.id)
    if (index !== -1) {
      state.spins.splice(index, 1, spin)
    } else {
      state.spins.push(spin)
    }
  },
  newOneSpinInteraction: (state, payload) => {
    let spin = state.spins.find(spin => spin.id === payload.spinId)
    let interaction = {
      'name': (spin.spinType === 'e') ? 'shielding' : 'csa',
      'id': parseInt(state.interactionId)
    }
    interaction['id'] = parseInt(state.interactionId)
    interaction.entries = Object.assign({}, payload.tensor)
    interaction.entries.id = parseInt(payload.spinId)
    interaction.entries.euler = Object.assign({}, payload.euler)

    ++state.interactionId
    state.interactions.push(interaction)
  },
  newTwoSpinInteraction: (state, payload) => {
    let interaction = {
      'name': payload.name,
      'id': parseInt(state.interactionId),
      'entries': {}
    }
    if (payload.hasOwnProperty('value')) { // scalar
      interaction.entries.value = parseFloat(payload.value)
    }

    interaction.entries.id1 = parseInt(payload.spinId1)
    interaction.entries.id2 = parseInt(payload.spinId2)

    ++state.interactionId
    state.interactions.push(interaction)
  },
  deleteInteraction: (state, interactionId) => {
    state.interactions = state.interactions.filter(interaction => interaction.id !== interactionId)
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
  updateSpin ({ commit }, spin) {
    commit('updateSpin', spin)
  },
  addOneSpinInteraction ({ commit }, payload) {
    commit('newOneSpinInteraction', payload)
  },
  addTwoSpinInteraction ({ commit }, payload) {
    commit('newTwoSpinInteraction', payload)
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
