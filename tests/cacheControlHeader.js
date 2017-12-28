const request = require('request')
const path = require('path')

const getSourceSamples = require('./getSourceSamples')

module.exports = function cacheControlHeader (t, source) {
  const samplesDir = path.join(__dirname, source, 'samples')
  const url = `http://localhost:8383/${source}/` + path.parse(getSourceSamples(samplesDir)[0]).name

  return new Promise(resolve => {
    const image = request(url)
    image.on('response', response => {
      t.is(
        response.headers['cache-control'],
        'public, max-age=1209600, no-transform', // cache for 14 days
        'Headers: ' + JSON.stringify(response.headers, null, true)
      )
      resolve()
    })
  })
}
