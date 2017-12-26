const request = require('request')
const template = {
  url: `https://www.googleapis.com/plus/v1/people/{{id}}?fields=image/url&key=` + process.env.GOOGLE_KEY,
  json: true
}

module.exports = async function getGoogleUrl (id) {
  const options = Object.assign({}, template)
  options.url = options.url.replace('{{id}}', id)

  return new Promise(resolve => {
    request(options, (error, response, parsedBody) => {
      if (error) {
        throw new Error(error)
      }

      resolve(parsedBody.image.url)
    })
  })
}
