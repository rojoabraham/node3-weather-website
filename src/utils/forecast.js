const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/6ce4be885d223b204f058132b8a360f2/' + long + ',' + lat + '?units=si&lang=es'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('No se conectó!')
        } else if(body.error){
            callback('No se encontró el lugar')
        }else{
        callback(undefined, body.daily.data[0].summary + ' La temperatura es ' + body.currently.temperature + ' grados afuera. Hay una probabilidad de ' + body.currently.precipProbability + '% de lluvia.')
        }
    })
}

module.exports = forecast