const state = {
  activeInputPrev: false,
  activeInputCurrent: false
}

const mutations = {
  setCurrentInputActive: (state) => {
    state.activeInputCurrent = true
  },
  setCurrentInputFinished: (state) => {
    state.activeInputCurrent = false
  },
  setPrevInputActive: (state) => {
    state.activeInputPrev = true
  },
  setPrevInputFinished: (state) => {
    state.activeInputPrev = false
  }
}

const actions = {
  setCurrentInputActive ({ commit }) {
    commit('setCurrentInputActive')
  },
  setCurrentInputFinished ({ commit }) {
    commit('setCurrentInputFinished')
  },
  setPrevInputActive ({ commit }) {
    commit('setPrevInputActive')
  },
  setPrevInputFinished ({ commit }) {
    commit('setPrevInputFinished')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
