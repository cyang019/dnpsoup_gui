const state = {
  spinsys: {
    euler: {
      alpha: 0.0,
      beta: 0.0,
      gamma: 0.0
    },
    interactions: [],
    irradiation: [],
    spins: {},
    currentId: 1
  }
}

const getters = {
  getSpins: state => state.spins,
  getInteractions: state => state.interactions
}

const mutations = {
  newSpin: (state, spin) => {
    state.spins[state.currentId] = spin
    ++state.currentId
  },
  newInteraction: (state, prop) => {
    if (['csa', 'shielding', 'hyperfine', 'dipole'].includes(prop.name.toLowerCase())) {
      prop.name = prop.name.toLowerCase()
      switch (prop.name) {
        case 'csa': case 'shielding':
          if (prop.entries.id in state.spins) {
            prop.name =
            state.interactions.push(prop)
          }
          break
        case 'dipole': case 'hyperfine':
          if (prop.entries.id1 in state.spins && prop.entries.id2 in state.spins) {
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
}

export default {
  state,
  getters,
  mutations,
  actions
}
