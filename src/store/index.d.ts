export interface Stats {
    moment: Date
    humidity: number
    minHumidity: number
    maxHumidity: number
    temperature: number
    minTemperature: number
    maxTemperature: number
}

export interface StoreState {
    stats: Array<Stats>|null
}
