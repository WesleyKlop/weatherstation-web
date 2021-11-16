<template>
    <BarChart :chart-data="chart" :options="options" />
</template>

<script setup>
import '@/utils/chart-config'
import { computed } from 'vue'
import { BarChart } from 'vue-chart-3'
import { useStore } from 'vuex'
import {
    createChartConfig,
    createChartOptions,
} from '@/utils/temperature-chart-config'

const store = useStore()

const chart = computed(() => createChartConfig(store.getters.mostRecentStats))
const options = computed(() =>
    createChartOptions(...store.getters.temperatureBounds),
)
</script>
