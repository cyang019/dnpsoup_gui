import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState } from 'vuex-electron'

// import modules from './modules'
import pulseseq from './modules/pulseseq'
import spinsys from './modules/spinsys'
import SimSettings from './modules/SimSettings'
import InputState from './modules/InputState'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pulseseq,
    spinsys,
    SimSettings,
    InputState
  },
  plugins: [
    // createPersistedState()
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
