// Native Node.js modules
const path = require('path')
const promisify = require('util').promisify
const fs = require('fs')

// Third party dependencies
const test = require('ava')
const supertest = require('supertest')

// Local modules
const app = require('./../src/app')('community')
const fallback = path.join(__dirname, '..', 'src', 'public', 'fallback.svg')

test('Should send 404 on non existent source', async t => {
  const res = await supertest(app)
    .get('/non-existent-source/terales')

  t.is(res.statusCode, 404)
  t.deepEqual(res.body, await promisify(fs.readFile)(fallback))
})
