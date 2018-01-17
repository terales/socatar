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
const runForPullRequestFromFork = require('./helpers/runForPullRequestFromFork')

Object.keys(sources)
  .filter(source => {
    const run = runForPullRequestFromFork(source)
    if (!run) { console.log(source + `: skipped base test suite on CI for pull request from fork because it requires secure evironment variables to pass`) }
    return run
  })
  .forEach(source => {
    test(source + ':validateReceivedImages', validateReceivedImages, source)
    test(source + ':cacheControlHeader', cacheControlHeader, source)
    test(source + ':notFoundImages', notFoundImages, source)
  })
