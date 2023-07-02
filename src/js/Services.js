export function getWeather(lat, lon) {
    const response = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m`)
        .then(res => res.json())
        .then(data => { return data })
    return response
}

export function getLocation(city) {
    const response = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(res => res.json())
        .then(data => { return data })
    return response
}