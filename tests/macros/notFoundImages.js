// Native Node.js modules
const path = require('path')
const fs = require('fs')

// Third party dependencies
const supertest = require('supertest')

// Local modules
const app = require('./../../src/app')()
const fallbackPath = path.join(__dirname, '..', '..', 'src', 'public', 'fallback.svg')
const fallbackImg = fs.readFileSync(fallbackPath)

module.exports = async function notFoundImages (t, source) {
  const res = await supertest(app)
    .get(`/${source}/definiteryWrongUserIdHere`)

  t.is(res.statusCode, 404)
  t.deepEqual(res.body, fallbackImg)
}
