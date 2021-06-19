/**
 * @returns {Promise<Stats>}
 */
// eslint-disable-next-line no-unused-vars
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
