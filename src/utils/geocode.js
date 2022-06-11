const request = require('request')

const geocode = (location, callback) => {
  const geocodeAPI = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
  const encodedLocation = encodeURIComponent(location)
  const token = 'pk.eyJ1Ijoibmlrb2xhMjMiLCJhIjoiY2wzdWl3eXEzMDA5eTNjcXc2b3J5ZWsxaCJ9.K2jCjesEyc-96UGV5RZdJQ'

  const url = `${geocodeAPI}/${encodedLocation}.json?access_token=${token}&limit=1`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode