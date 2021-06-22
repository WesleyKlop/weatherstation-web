import { createStore } from 'vuex'
import { fetchStats } from '../utils'

/** @type {StoreState} */
const initialState = {
    stats: null,
}

export default createStore({
    strict: true,
    state: initialState,
    mutations: {
        setStats(state, stats) {
            state.stats = stats
        },
    },
    actions: {
        async fetchStats({ commit }) {
            const stats = await fetchStats()
            commit('setStats', stats)
        },
    },
    modules: {},
})
