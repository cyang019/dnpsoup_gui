const state = {
  euler: {
    alpha: 0.0,
    beta: 0.0,
    gamma: 0.0
  },
  interactions: [],
  irradiation: [],
  spins: {}
}

const getters = {
  getSpins: state => state.spins,
  getInteractions: state => state.interactions
}

/* eslint-disable no-unused-vars */

const mutations = {
  newSpin: (state, payload) => {
    const spinid = payload[0]
    const spin = payload[1]
    state.spins = { ...state.spins, spinid: spin }
  },
  newInteraction: (state, prop) => {
    if (['csa', 'shielding', 'hyperfine', 'dipole'].includes(prop.name.toLowerCase())) {
      prop.name = prop.name.toLowerCase()
      switch (prop.name) {
        case 'csa': case 'shielding':
          if (prop.entries.id in state.spins) {
            state.interactions.push(prop)
          }
          break
        case 'dipole': case 'hyperfine':
          if (prop.entries.id1 in state.spins &&
            prop.entries.id2 in state.spins) {
            state.interactions.push(prop)
          }
          break
        default:
          break
      }
    }
  }
}

const actions = {
  addSpin ({ commit }, payload) {
    commit('newSpin', payload)
  },
  addInteraction ({ commit }, interaction) {
    commit('newInteraction', interaction)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
