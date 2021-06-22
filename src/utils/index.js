import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import nl from 'date-fns/locale/nl'

/**
 * @returns {Promise<Stats>}
 */
export const fetchStats = () =>
    fetch('/api/stats', {
        cache: 'no-cache',
        headers: {
            Accept: 'application/json',
        },
    })
        .then((response) => response.json())
        .then((result) =>
            result.map((data) => ({
                moment: data.moment,
                humidity: data.humidity,
                minHumidity: data.min_humidity,
                maxHumidity: data.max_humidity,
                temperature: data.temperature,
                minTemperature: data.min_temperature,
                maxTemperature: data.max_temperature,
            })),
        )
        .catch((err) => {
            console.error(err)
            return null
        })

/**
 * Convert ISO date string to relative format
 * @param {string} label
 * @returns {string}
 */
export const formatLabel = (label) =>
    formatDistanceToNowStrict(parseISO(label), { locale: nl })

/**
 * Format a floating point to a temperature string.
 * @param {number} value
 * @returns {string}
 */
export const formatTemperature = (value) =>
    new Intl.NumberFormat('nl-NL', {
        style: 'unit',
        unit: 'celsius',
    }).format(value)

export const formatHumidity = (value) =>
    new Intl.NumberFormat('nl-NL', {
        style: 'unit',
        unit: 'percent',
    }).format(value)
