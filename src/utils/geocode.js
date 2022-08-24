const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=889e3331ba8ef1e695db19c53bb89aba&query=' + address +'&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        
        } else if (body.data === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data.latitude,
                longitude: body.data.longitude,
            },{})
        }
    })
}

module.exports = geocode