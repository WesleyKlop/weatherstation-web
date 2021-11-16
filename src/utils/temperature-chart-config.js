import { formatLabel, formatTemperature } from '@/utils'

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

const CHART_OPTIONS = () => ({
    responsive: true,
    scales: {
        x: {
            stacked: true,
            title: { display: true, text: 'Tijd geleden' },
        },
        y: {
            stacked: true,
            // min: 21,
            // max: 25,
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
})

/**
 * @param {Stats[]} stats
 */
export const createChartConfig = (stats) =>
    stats.reduce((acc, curr) => {
        acc.labels.push(formatLabel(curr.moment))
        acc.datasets[0].data.push(curr.temperature)
        acc.datasets[1].data.push([curr.minTemperature, curr.maxTemperature])
        return acc
    }, CHART_CONFIG)

export const createChartOptions = (min, max) => {
    const options = CHART_OPTIONS()
    options.scales.y.min = Math.floor(min)
    options.scales.y.max = Math.ceil(max)
    return options
}
