const test = require('ava')
const path = require('path')

const validateReceivedImages = require('./macros/validateReceivedImages')
const notFoundImages = require('./macros/notFoundImages')
const cacheControlHeader = require('./macros/cacheControlHeader')

const sources = require(path.join(__dirname, '..', 'src', 'sources', 'index'))

Object.keys(sources).forEach(source => {
  test(source + ':validateReceivedImages', validateReceivedImages, source)
  test(source + ':cacheControlHeader', cacheControlHeader, source)
  test(source + ':notFoundImages', notFoundImages, source)
})
