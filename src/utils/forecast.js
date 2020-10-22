const request = require('request')

const forecast = (latitude, longitude, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=df6978347cf26987cefb9546a136ccb6&query=${latitude},${longitude}&units=m`

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location, try to search again', undefined)
        }else {
            const data = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature
                        + " degree out there. " + " It feels like " + body.current.feelslike + " degrees out"

            callback(undefined, data)
        }
    })
}

module.exports = forecast
