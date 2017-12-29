// Third party dependencies
const request = require('request')
const getProperty = require('lodash.get')

module.exports = async function fetchImageUrlFromSourceJson (requestOptions, propertyPath) {
  return new Promise((resolve, reject) => {
    request(requestOptions, (error, response, parsedBody) => {
      if (error) { reject(new Error(error)) }

      const url = getProperty(parsedBody, propertyPath, '')
      return url ? resolve(url) : reject(new Error('404'))
    })
  })
}
