const test = require('ava')
const path = require('path')

const validateReceivedImages = require('./validateReceivedImages')
const notFoundImages = require('./notFoundImages')

const sources = require(path.join(__dirname, '..', 'src', 'sources', 'index'))

Object.keys(sources).forEach(source => {
  test(source + ':validateReceivedImages', validateReceivedImages, source)

  if (source === 'gravatar') { return }

  test(source + ':notFoundImages', notFoundImages, source)
})
