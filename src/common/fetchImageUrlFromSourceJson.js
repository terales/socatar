// Native Node.js modules
const promisify = require('util').promisify

// Third party dependencies
const request = require('request')
const getProperty = require('lodash.get')

module.exports = async function fetchImageUrlFromSourceJson (requestOptions, propertyPath) {
  const res = await promisify(request)(requestOptions)
  const url = getProperty(res.body, propertyPath, '')
  if (!url) { throw new Error('404') }
  return url
}
