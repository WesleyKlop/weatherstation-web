import { formatHumidity, formatLabel } from '@/utils/index'

const CHART_CONFIG = {
    labels: [],
    datasets: [
        {
            data: [],
            borderColor: '#0ea5e9',
            backgroundColor: '#0ea5e9',
            label: 'Gemiddelde',
            type: 'line',
        },
        { data: [], backgroundColor: '#f97316', label: 'Bereik' },
    ],
}

const CHART_OPTIONS = () => ({
    responsive: true,
    scales: {
        x: {
            stacked: true,
            title: { display: true, text: 'Tijd' },
        },
        y: {
            stacked: true,
            title: { display: true, text: 'Luchtvochtigheid in %' },
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
                        return `${label}: ${formatHumidity(value)}`
                    }
                    const set = context.chart.data.datasets[1]
                    const values = set.data[context.dataIndex]
                        .map((value) => formatHumidity(value))
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
        acc.datasets[0].data.push(curr.humidity)
        acc.datasets[1].data.push([curr.minHumidity, curr.maxHumidity])
        return acc
    }, CHART_CONFIG)

export const createChartOptions = (min, max) => {
    const options = CHART_OPTIONS()
    options.scales.y.min = Math.floor(min)
    options.scales.y.max = Math.ceil(max)
    return options
}
