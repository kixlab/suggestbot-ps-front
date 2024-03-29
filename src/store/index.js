import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: '',
    username: '',
    dataset: '',
    turkerId: '',
    taskType: '',
    initialTime: 0,
    windowSize: 120,
    finishTime: 0,
    randomWords: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsername(state, username) {
      state.username = username
    },
    setDataset(state, dataset) {
      state.dataset = dataset
    },
    setTurkerId(state, turkerId) {
      state.turkerId = turkerId
    },
    setTaskType(state, taskType) {
      state.taskType = taskType
    },
    setInitialTime(state, initialTime) {
      state.initialTime = initialTime
    },
    setFinishTime(state, finishTime) {
      state.finishTime = finishTime
    },
    setRandomWords(state, randomWords) {
      state.randomWords = randomWords
    }
  },
  actions: {
  },
  modules: {
  }
})
