// Native Node.js modules
const path = require('path')
const promisify = require('util').promisify
const fs = require('fs')

// Third party dependencies
const supertest = require('supertest')

// Local modules
const app = require('./../../src/app')('managed')

module.exports = async function notFoundImages (t, source) {
  const res = await supertest(app)
    .get(`/${source}/definiteryWrongUserIdHere`)
    .redirects(1)

  if (res.redirects.length > 0) {
    // We have 404 from Cloudinary
    const fallback = path.join(__dirname, 'fallback.png')
    t.true(res.headers['x-cld-error'].startsWith('Resource not found'))
    t.deepEqual(res.body, await promisify(fs.readFile)(fallback))
  } else {
    // We have response from Socatar Managed: 404 was received while getting image url
    const fallback = path.join(__dirname, '..', '..', 'src', 'public', 'fallback.svg')
    t.is(res.statusCode, 404)
    t.deepEqual(res.body, await promisify(fs.readFile)(fallback))
  }
}
