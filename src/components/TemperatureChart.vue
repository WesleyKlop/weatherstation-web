<template>
    <bar v-if="chart" :data="chart" :options="options" />
</template>

<script>
import '@/utils/chart-config'
import { formatLabel, formatTemperature } from '@/utils'
import { computed } from 'vue'
import { Bar } from 'vue-chart-3'
import { useStore } from 'vuex'

const CHART_CONFIG = {
    labels: [],
    datasets: [
        {
            data: [],
            borderColor: '#0EA5E9',
            backgroundColor: '#0EA5E9',
            label: 'Gemiddelde',
            type: 'line',
        },
        { data: [], backgroundColor: '#F97316', label: 'Bereik' },
    ],
}

const CHART_OPTIONS = {
    responsive: true,
    scales: {
        x: {
            stacked: true,
            title: { display: true, text: 'Tijd geleden' },
        },
        y: {
            stacked: true,
            min: 15,
            title: { display: true, text: 'Temperatuur in °C' },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                label(context) {
                    const label = context.dataset.label
                    if (context.datasetIndex === 0) {
                        const set = context.chart.data.datasets[0]
                        const value = set.data[context.dataIndex].toFixed(2)
                        return `${label}: ${formatTemperature(value)}`
                    }
                    const set = context.chart.data.datasets[1]
                    const values = set.data[context.dataIndex]
                        .map((value) => formatTemperature(value))
                        .join(' - ')

                    return `${label}: ${values}`
                },
            },
        },
    },
}

export default {
    components: { Bar },
    setup() {
        const store = useStore()

        const chart = computed(() =>
            store.state.stats
                ?.slice(0, 12)
                ?.reverse()
                ?.reduce((acc, curr) => {
                    acc.labels.push(formatLabel(curr.moment))
                    acc.datasets[0].data.push(curr.temperature)
                    acc.datasets[1].data.push([
                        curr.minTemperature,
                        curr.maxTemperature,
                    ])
                    return acc
                }, CHART_CONFIG),
        )
        return { chart, options: CHART_OPTIONS }
    },
}
</script>
