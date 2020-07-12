const state = {
  name: '',
  increment: 1.0e-9,
  emrs: [],
  sections: [],
  sequence: [],
  channelOptions: ['e'],
  sectionOptions: [
    'Delay', 'Pulse', 'Chirp',
    'Section'
  ],
  loadedFromFile: false
}

const getters = {
  getEmrs: state => state.emrs,
  getEmrByName: state => name => {
    return state.emrs.find(emr => emr.name === name)
  },

  getSections: state => state.sections,
  getSectionByName: state => name => {
    return state.sections.find(section => section.name === name)
  }
}

const mutations = {
  setName: (state, name) => {
    state.name = name.slice(0, name.length)
  },
  setIncrement: (state, inc) => {
    state.increment = parseFloat(inc)
  },
  newEmr: (state, emr) => state.emrs.push(emr),
  removeEmrByName: (state, name) =>
    (state.emrs = state.emrs.filter(tmpEmr => tmpEmr.name !== name)),
  updateEmr: (state, emr) => {
    const updatedEmr = {
      spinType: 'e',
      name: emr.name,
      channels: Object.assign([], emr.channels)
    }
    if (emr.hasOwnProperty('edit')) {
      if (emr.edit === 'add') {
        state.emrs.push(updatedEmr)
      } else { // 'edit'
        if (emr.hasOwnProperty('index')) {
          state.emrs.splice(emr.index, 1, updatedEmr)
        } else { // otherwise derive index from name
          const index = state.emrs.findIndex(tmpEmr => tmpEmr.name === emr.name)
          if (index !== -1) { // if it was actually in the list
            state.emrs.splice(index, 1, updatedEmr)
          } else {
            state.emrs.push(updatedEmr)
          }
        }
      }
    } else {
      const index = state.emrs.findIndex(tmpEmr => tmpEmr.name === emr.name)
      if (index !== -1) { // if it was actually in the list
        state.emrs.splice(index, 1, updatedEmr)
      } else {
        state.emrs.push(updatedEmr)
      }
    }
  },

  newSection: (state, section) => state.sections.push(section),
  removeSectionByName: (state, name) => {
    state.sections = state.sections.filter(section => section.name !== name)
  },
  updateSection: (state, section) => {
    const index = state.sections.findIndex(tmpSection => tmpSection.name === section.name)
    if (index !== -1) {
      state.sections.splice(index, 1, section)
    } else {
      state.sections.push(section)
    }
  },

  newSubSequence: (state, subseqName) => state.sequence.push(subseqName),
  removeSubSequenceByName: (state, subseqName) => {
    state.sequence = state.sequence.filter(name => name !== subseqName)
  },
  resetPulseseq: (state) => {
    state.increment = 1.0e-9
    state.emrs = []
    state.sections = []
    state.sequence = []
  },
  setLoaded: (state, value) => {
    state.loadedFromFile = Boolean(value)
  }
}

const actions = {
  setName ({ commit }, name) {
    commit('setName', name)
  },
  setIncrement ({ commit }, inc) {
    commit('setIncrement', inc)
  },
  addEmr ({ commit }, emr) {
    commit('newEmr', emr)
  },
  deleteEmrByName ({ commit }, name) {
    commit('removeEmrByName', name)
  },
  updateEmr ({ commit }, emr) {
    commit('updateEmr', emr)
  },
  addSection ({ commit }, section) {
    commit('newSection', section)
  },
  deleteSectionByName ({ commit }, name) {
    commit('removeSectionByName', name)
  },
  updateSection ({ commit }, section) {
    commit('updateSection', section)
  },
  addSectionToSequence ({ commit }, sectionName) {
    commit('newSubSequence', sectionName)
  },
  deleteNameInSequence ({ commit }, sectionName) {
    commit('removeSubSequenceByName', sectionName)
  },
  resetPulseseq ({ commit }) {
    commit('resetPulseseq')
  },
  setLoaded ({ commit }, value) {
    commit('setLoaded', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
