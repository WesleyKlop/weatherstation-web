<template>
    <div class="p-4 flex flex-wrap gap-4">
        <h1 class="title w-full">Weerstation</h1>
        <TemperatureChart v-if="loaded" class="w-full lg:w-1/2 flex-1" />
        <HumidityChart v-if="loaded" class="w-full lg:w-1/2 flex-1" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

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
</script>

<style scoped>
.title {
    @apply text-xl font-bold;
}
</style>
