const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9qb2FicmFoYW0iLCJhIjoiY2p4YW9obTgwMThsbjN6cWI2MTRmdTRmYSJ9.7KNv_NCUncyQVeMx_Kv1ig&limit=1'
   // console.log(url)
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('No se pudo conectar a los location services')
        }else if(body.features.length === 0){
            callback('Unable to find location, try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
