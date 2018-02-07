// Third party dependencies
const test = require('ava')

// Test macros
const validateReceivedImagesOneSample = require('../macros/validateReceivedImagesOneSample')

const app = require('./../../src/app')()

test(
  'Should return required original size: native',
  validateReceivedImagesOneSample,
  app,
  __dirname,
  'receivables-native'
)
