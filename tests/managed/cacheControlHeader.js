const supertest = require('supertest')
const path = require('path')

const app = require('./../../src/app')
const getSourceSamples = require('./../helpers/getSourceSamples')

module.exports = async function cacheControlHeader (t, source) {
  const sample = path.parse(getSourceSamples(source, 'managed').files[0]).name

  const res = await supertest(app)
    .get(`/${source}/${sample}`)
    .redirects(1)

  // Cloudinary initially caches images for 7 days, but always has a decreased amount of time seconds
  t.true(res.headers['cache-control'].startsWith('public, private, max-age='))
}
