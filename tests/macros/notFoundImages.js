// Native Node.js modules
const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify

// Third party dependencies
const supertest = require('supertest')

// Local modules
const app = require('./../../src/app')('community')
const fallback = path.join(__dirname, '..', '..', 'src', 'public', 'fallback.svg')

module.exports = async function notFoundImages (t, source) {
  const res = await supertest(app)
    .get(`/${source}/definiteryWrongUserIdHere`)

  t.is(res.statusCode, 404)
  t.deepEqual(await promisify(fs.readFile)(fallback), res.body)
}
