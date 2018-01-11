// Native Node.js modules
const path = require('path')
const fs = require('fs')

// Third party dependencies
const supertest = require('supertest')

// Local modules
const app = require('./../../src/app')('community')
const areImagesLooksAlike = require('./../helpers/areImagesLooksAlike')
const fallback = path.join(__dirname, '..', '..', 'src', 'public', 'fallback.svg')

module.exports = async function notFoundImages (t, source) {
  t.plan(2)
  const receivedPath = path.join(__dirname, '..', 'sources', source, 'receivables-community', '404')
  return supertest(app)
    .get(`/${source}/definiteryWrongUserIdHere`)

    .then(res => {
      t.is(res.statusCode, 404)
      fs.writeFileSync(receivedPath, res.body)
      return areImagesLooksAlike(fallback, receivedPath)
    })

    .then(imagesLookAlike => t.true(imagesLookAlike))
}
