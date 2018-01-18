const test = require('ava')
const supertest = require('supertest')

const app = require('./../src/app')

// Test helpers
const testRunner = require('./helpers/runForPullRequestFromFork')('google') ? test : test.skip

testRunner('Should not pipe body if there is a matching ETag', async t => {
  const res = await supertest(app)
    .get('/google/terehov.alexander.serg@gmail.com')
    .set('If-None-Match', '"v6d30"')

  t.is(res.statusCode, 304)
  t.deepEqual(res.body, {})
})
