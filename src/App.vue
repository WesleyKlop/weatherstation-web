<template>
    <div class="p-4 flex flex-wrap gap-4">
        <h1 class="title w-full">Weerstation</h1>
        <TemperatureChart class="w-full lg:w-1/2" />
    </div>
</template>

<script>
import TemperatureChart from '@/components/TemperatureChart'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        TemperatureChart,
    },
    setup() {
        const store = useStore()

        if (!Array.isArray(store.state.stats)) {
            store.dispatch('fetchStats')
        }

        return {
            lines: computed(() => store.state.stats?.length),
        }
    },
}
</script>

<style scoped>
.title {
    @apply text-xl font-bold;
}
</style>
