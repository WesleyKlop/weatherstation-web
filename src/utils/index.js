/**
 * @param {string} token
 * @returns {Promise<Stats>}
 */
export const fetchStats = (token) =>
    fetch('/api/stats', {
        cache: 'no-cache',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => ({
            moment: data.moment,
            humidity: data.humidity,
            minHumidity: data.min_humidity,
            maxHumidity: data.max_humidity,
            temperature: data.temperature,
            minTemperature: data.min_temperature,
            maxTemperature: data.max_temperature,
        }))
