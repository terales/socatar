const test = require('ava')
const supertest = require('supertest')

const app = require('./../src/index.js')

test('Should not pipe body if there is a matching if-modified-since', async t => {
  const res = await supertest(app)
    .get('/twitter/terales_')
    .set('If-Modified-Since', 'Tue, 14 Nov 2017 20:13:41 GMT')

  t.is(res.statusCode, 304)
  t.deepEqual(res.body, {})
})
