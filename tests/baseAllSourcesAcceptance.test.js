// Third party dependencies
const test = require('ava')
const path = require('path')

// Local modules
const sources = require(path.join(__dirname, '..', 'src', 'sources', 'index'))

// Test macros
const validateReceivedImages = require('./macros/validateReceivedImages')
const notFoundImages = require('./macros/notFoundImages')
const cacheControlHeader = require('./macros/cacheControlHeader')

// Test helpers
const filterOurSourcesWithSecureCredentials = require('./helpers/filterOurSourcesWithSecureCredentials')

Object.keys(sources)
  .filter(source => filterOurSourcesWithSecureCredentials(source))
  .forEach(source => {
    test(source + ':validateReceivedImages', validateReceivedImages, source)
    test(source + ':cacheControlHeader', cacheControlHeader, source)
    test(source + ':notFoundImages', notFoundImages, source)
  })
