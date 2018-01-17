// Third party dependencies
const test = require('ava')
const path = require('path')

// Local modules
const validateReceivedImages = require('./managed/validateReceivedImages')
const notFoundImages = require('./managed/notFoundImages')
const cacheControlHeader = require('./managed/cacheControlHeader')

const sources = require(path.join(__dirname, '..', 'src', 'sources', 'index'))

if (process.env.CLOUDINARY_URL) {
  Object.keys(sources).forEach(source => {
    test(source + ':validateReceivedImages', validateReceivedImages, source)
    test(source + ':cacheControlHeader', cacheControlHeader, source)
    test(source + ':notFoundImages - managed', notFoundImages, source)
  })
} else {
  console.log('Managed tier acceptance test suite skipped because of hidden/empty `CLOUDINARY_URL` environment variable')
}
