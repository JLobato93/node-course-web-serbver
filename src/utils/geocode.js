const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamxvY29zYW4iLCJhIjoiY2t1bGRzZ2UxMDhsZjJ1dGgwcTU0ZnhzOSJ9.ZnGkxCLLvkynPk9NOwiMtg&limit=1'
    request({url, json: true}, (error, response) => {
        const {body: {features, message}} = response
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (!features.length) {
            callback(message, undefined)
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode