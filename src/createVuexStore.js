import Vuex from 'vuex'

const state = {
  count: 0,
  loading: false
}

const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  },
  divide(state, amount) {
    state.count /= amount
  },
  multiplyStart(state) {
    state.loading = true
  },
  multiply(state, payload) {
    state.count *= payload.amount
    state.loading = false
  }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  divide: ({ commit }, amount) => commit('divide', amount),
  multiplyAsync: ({ commit }, amount) => {
    if (!amount) return alert('please enter an amount!')

    commit({ type: 'multiplyStart', amount })

    return new Promise(resolve => {
      setTimeout(() => {
        commit({ type: 'multiply', amount })
        resolve()
      }, 1000)
    })
  }
}

const getters = {
  count: state => state.count,
  loading: state => state.loading,
  isOdd: state => state.count % 2 === 1
}

let _store

export default () =>
  (_store =
    _store ||
    new Vuex.Store({
      state,
      getters,
      actions,
      mutations
    }))
