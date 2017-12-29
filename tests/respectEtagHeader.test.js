const test = require('ava')
const supertest = require('supertest')

const app = require('./../src/app')

test('Should not pipe body if there is a matching ETag', async t => {
  const res = await supertest(app)
    .get('/google/+SriramSaroop')
    .set('If-None-Match', '"v30b6"')

  t.is(res.statusCode, 304)
  t.deepEqual(res.body, {})
})
