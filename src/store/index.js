import { createStore } from 'vuex'
import { fetchStats } from '@/utils'

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
    getters: {
        mostRecentStats(state) {
            return state.stats?.slice(0, 12)?.reverse() ?? []
        },
        temperatureBounds(state, getters) {
            return getters.mostRecentStats.reduce(
                ([min, max], curr) => [
                    Math.min(min, curr.minTemperature - 1),
                    Math.max(max, curr.maxTemperature + 1),
                ],
                [100, -100],
            )
        },
        humidityBounds(state, getters) {
            return getters.mostRecentStats.reduce(
                ([min, max], curr) => [
                    Math.min(min, curr.minHumidity - 1),
                    Math.max(max, curr.maxHumidity + 1),
                ],
                [101, -1],
            )
        },
        dateRange(state, getters) {
            const mostRecentStats = getters.mostRecentStats
            if (mostRecentStats.length < 2) {
                return null
            }

            return [mostRecentStats.at(0).moment, mostRecentStats.at(-1).moment]
        },
    },
    modules: {},
})
