const supertest = require('supertest')
const path = require('path')

const app = require('./../src/index.js')
const getSourceSamples = require('./getSourceSamples')

module.exports = async function cacheControlHeader (t, source) {
  const samplesDir = path.join(__dirname, source, 'samples')
  const sample = path.parse(getSourceSamples(samplesDir)[0])

  const res = await supertest(app)
    .get(`/${source}/${sample.name}`)

  t.is(res.headers['cache-control'], 'public, max-age=1209600, no-transform') // cache for 14 days
}
