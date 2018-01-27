// Native Node.js modules
const fs = require('fs')
const path = require('path')

// Third party dependencies
const supertest = require('supertest')
const rimraf = require('rimraf')

// Local modules
const app = require('./../../src/app')()
const getSourceSamples = require('./../helpers/getSourceSamples')
const imageMagicCompare = require('./../helpers/imageMagicCompare')

module.exports = async function validateReceivedImages (t, source) {
  const samples = getSourceSamples(source)
  const receivablesDir = path.join(__dirname, '..', 'sources', source, 'receivables')
  clearDir(receivablesDir)

  t.plan(samples.files.length)

  for (let file of samples.files) {
    const sample = path.join(samples.dir, file)
    const received = await getReceivedImage(receivablesDir, source, file)
    const isEqual = await imageMagicCompare(sample, received)
    t.true(isEqual, 'Received unexpected image: ' + file)
  }
}

function clearDir (dir) {
  rimraf.sync(dir)
  fs.mkdirSync(dir)
}

function getReceivedImage (receivablesDir, source, file) {
  return new Promise(resolve => {
    supertest(app)
        .get(`/${source}/` + path.parse(file).name)
        .pipe(fs.createWriteStream(path.join(receivablesDir, file)))
        .on('finish', () => resolve(path.join(receivablesDir, file)))
  })
}
