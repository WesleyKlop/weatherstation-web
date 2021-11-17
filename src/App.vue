<template>
    <div class="p-4 grid gap-4 grid-cols-2">
        <h1 class="title col-span-2">Weerstation</h1>
        <TemperatureChart v-if="loaded" class="graph" />
        <HumidityChart v-if="loaded" class="graph" />
        <p v-if="dateRange">
            Het bereik loopt van {{ dateRange[0] }} tot {{ dateRange[1] }}
        </p>
    </div>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { formatDateTime } from '@/utils'

const loaded = ref(false)
const TemperatureChart = defineAsyncComponent(() =>
    import('@/components/TemperatureChart.vue'),
)
const HumidityChart = defineAsyncComponent(() =>
    import('@/components/HumidityChart.vue'),
)

const store = useStore()
onMounted(async () => {
    await store.dispatch('fetchStats')
    loaded.value = true
})

const dateRange = computed(() =>
    store.getters.dateRange?.map((d) => formatDateTime(d)),
)
</script>

<style scoped>
.title {
    @apply text-xl font-bold;
}

.graph {
    @apply row-span-1 col-span-2 lg:col-span-1;
}
</style>
