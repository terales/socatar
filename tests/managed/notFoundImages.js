// Native Node.js modules
const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify

// Third party dependencies
const supertest = require('supertest')

// Local modules
const app = require('./../../src/app')('managed')
const areImagesLooksAlike = require('./../helpers/areImagesLooksAlike')

module.exports = async function notFoundImages (t, source) {
  t.plan(2)

  const res = await supertest(app)
    .get(`/${source}/definiteryWrongUserIdHere`)
    .redirects(1)

  if (res.redirects.length > 0) {
    // We have 404 from Cloudinary
    t.true(res.headers['x-cld-error'].startsWith('Resource not found'))
    const receivedPath = path.join(__dirname, '..', 'sources', source, 'receivables-managed', '404.png')
    const fallback = path.join(__dirname, 'fallback.png')
    await promisify(fs.writeFile)(receivedPath, res.body)
    t.true(await areImagesLooksAlike(fallback, receivedPath))
  } else {
    // We have response from Socatar Managed: 404 was received while getting image url
    t.is(res.statusCode, 404)
    const fallback = path.join(__dirname, '..', '..', 'src', 'public', 'fallback.svg')
    t.deepEqual(await promisify(fs.readFile)(fallback), res.body)
  }
}
