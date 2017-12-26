const request = require('request')
const getProperty = require('lodash.get')
const template = {
  url: `https://www.googleapis.com/plus/v1/people/{{id}}?fields=image/url&key=` + process.env.GOOGLE_KEY,
  json: true
}

module.exports = async function getGoogleUrl (id) {
  const options = Object.assign({}, template)
  options.url = options.url.replace('{{id}}', id)

  return new Promise((resolve, reject) => {
    request(options, (error, response, parsedBody) => {
      if (error) { throw new Error(error) }

      const url = getProperty(parsedBody, 'image.url', '')
      return url ? resolve(url) : reject(new Error('404'))
    })
  })
}
