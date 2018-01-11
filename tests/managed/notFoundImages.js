// Native Node.js modules
const path = require('path')
const fs = require('fs')

// Third party dependencies
const supertest = require('supertest')

// Local modules
const app = require('./../../src/app')('managed')
const areImagesLooksAlike = require('./../helpers/areImagesLooksAlike')

module.exports = async function notFoundImages (t, source) {
  t.plan(2)

  const receivedPath = path.join(__dirname, '..', 'sources', source, 'receivables-managed', '404')
  return supertest(app)
    .get(`/${source}/definiteryWrongUserIdHere`)
    .redirects(1)

    .then(res => {
      let fallback

      if (res.redirects.length > 0) {
        // We have 404 from Cloudinary
        t.true(res.headers['x-cld-error'].startsWith('Resource not found'))
        fallback = path.join(__dirname, 'fallback.png')
      } else {
        // We have response from Socatar Managed: 404 was received while getting image url
        t.is(res.statusCode, 404)
        fallback = path.join(__dirname, '..', '..', 'src', 'public', 'fallback.svg')
      }

      fs.writeFileSync(receivedPath, res.body)
      return areImagesLooksAlike(fallback, receivedPath)
    })

    .then(imagesLookAlike => t.true(imagesLookAlike))
}
