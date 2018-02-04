const supertest = require('supertest')
const path = require('path')

const app = require('./../../src/app')()
const getSourceSamples = require('./../helpers/getSourceSamples')

module.exports = async function cacheControlHeader (t, source) {
  const sample = path.parse(getSourceSamples(source).files[0]).name

  const res = await supertest(app)
    .get(`/${source}/${sample}`)

  t.is(res.headers['cache-control'], 'public, max-age=1209600, no-transform') // cache for 14 days
}
