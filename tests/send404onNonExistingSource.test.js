const test = require('ava')
const supertest = require('supertest')

const app = require('./../src/app')

test('Should send 404 on non existent source wothout invoking next error handlers', async t => {
  const res = await supertest(app)
    .get('/non-existent-source/terales')

  t.is(res.statusCode, 404)
  t.deepEqual(res.body, {})
})
