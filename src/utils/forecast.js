const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=513aba1a9b1bc894a774184595358219&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({url, json: true}, (error, response) => {
        const {body: {error: responseError, current: {temperature, feelslike} ={}}} = response
        if (error) {
            callback('Unable to connect to service', undefined)
        } else if (responseError) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is currently ${temperature} degrees but it feels like ${feelslike} degrees`)
        }
    })
}

module.exports = forecast