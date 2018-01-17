const supertest = require('supertest')
const path = require('path')

const app = require('./../../src/app')('managed')
const getSourceSamples = require('./../helpers/getSourceSamples')

module.exports = async function cacheControlHeader (t, source) {
  const sample = path.parse(getSourceSamples(source, 'managed').files[0]).name

  const res = await supertest(app)
    .get(`/${source}/${sample}`)

  // Cloudinary initially caches images for 7 days, but always has a decreased amount of time seconds
  // We are only checking what we can control: cache of our redirect to Cloudinary
  t.is(res.headers['cache-control'], 'public, max-age=1209600, no-transform')
}
