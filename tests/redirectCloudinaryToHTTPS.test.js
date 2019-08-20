// Third party dependencies
const test = require('ava')
const supertest = require('supertest')

const app = require('./../src/app')(true)

// Test helpers
const testRunner = process.env.CLOUDINARY_URL ? test : test.skip

testRunner('Should always redirect to HTTPS Cloudinary URL', async t => {
  const res = await supertest(app)
    .get('/github/yegor256/192-192')

  t.is(res.statusCode, 302)
  t.true(res.headers.location.startsWith('https'))
})
