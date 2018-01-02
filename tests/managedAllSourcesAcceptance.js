// Switch to a managed tier
process.env.TIER = 'managed'

// Third party dependencies
const test = require('ava')
const path = require('path')

// const validateReceivedImages = require('./managed/validateReceivedImages')
const notFoundImages = require('./managed/notFoundImages')
// const cacheControlHeader = require('./managed/cacheControlHeader')

const sources = require(path.join(__dirname, '..', 'src', 'sources', 'index'))

Object.keys(sources).forEach(source => {
  // Receiving different fallback image
  // Receiving 'public, private, max-age=604800' cache-control header
  // test(source + ':validateReceivedImages', validateReceivedImages, source)
  // test(source + ':cacheControlHeader', cacheControlHeader, source)
  test(source + ':notFoundImages - managed', notFoundImages, source)
})
