// Third party dependencies
const test = require('ava')
require('dotenv').config()

// Test macros
const validateReceivedImagesOneSample = require('../macros/validateReceivedImagesOneSample')

// Test helpers
const testRunner = process.env.CLOUDINARY_URL ? test : test.skip

const app = require('./../../src/app')(true)

testRunner(
  'Should return required original size: Cloudinary',
  validateReceivedImagesOneSample,
  app,
  __dirname,
  'receivables-cloudinary'
)
