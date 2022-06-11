const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const forecastAPI = 'http://api.weatherstack.com/current'
  const access_key = '38ec1761b87f71002934f212cd83e2a8'

  const url = `${forecastAPI}?access_key=${access_key}&query=${latitude},${longitude}`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
      callback('Unable to find location.', undefined)
    } else {
      const description = response.body.current.weather_descriptions[0]
      const temperature = response.body.current.temperature
      const feelsLike = response.body.current.feelslike

      callback(undefined, {
        description,
        temperature,
        feelsLike
      })
    }
  })
}

module.exports = forecast