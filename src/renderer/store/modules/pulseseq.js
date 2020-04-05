const state = {
  increment: 1.0e-9,
  emrs: [],
  sections: [],
  sequence: [],
  channelOptions: ['e'],
  sectionOptions: [
    'Delay', 'Pulse', 'Chirp',
    'Section'
  ]
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
