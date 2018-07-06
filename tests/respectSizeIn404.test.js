// Third party dependencies
const test = require('ava')
const supertest = require('supertest')

// Local modules
const app = require('./../src/app')()

test('Should respect requested size on 404 placeholder', async t => {
  const res = await supertest(app)
    .get('/gravatar/no-exisitng-user/64-64')

  t.is(res.statusCode, 404)
  t.true(res.body.indexOf('width="64"') !== -1)
  t.true(res.body.indexOf('height="64"') !== -1)
})
