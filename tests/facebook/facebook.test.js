const test = require('ava')
const validateReceivedImages = require('../validateReceivedImages')

test('loads correct images', t => {
  return validateReceivedImages('facebook', t)
})
