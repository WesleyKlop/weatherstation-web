<template>
    <div>Yolo, {{ stats.length }} lijnen data</div>
    <pre v-if="stats.length > 0"><code>{{ stats }}</code></pre>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {},
    setup() {
        const store = useStore()

        if (!Array.isArray(store.state.stats)) {
            store.dispatch('fetchStats')
        }

        console.log(store)

        return {
            stats: computed(() => store.state.stats || []),
        }
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
