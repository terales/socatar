// Native Node.js modules
const fs = require('fs')
const path = require('path')

// Third party dependencies
const supertest = require('supertest')
const rimraf = require('rimraf')

// Local modules
const app = require('./../../src/app')('managed')
const getSourceSamples = require('./../helpers/getSourceSamples')
const areImagesLooksAlike = require('./../helpers/areImagesLooksAlike')

module.exports = async function validateReceivedImages (t, source) {
  const samples = getSourceSamples(source, 'managed')
  const receivablesDir = path.join(__dirname, '..', 'sources', source, 'receivables-managed')

  clearDir(receivablesDir)

  t.plan(samples.files.length)

  for (let file of samples.files) {
    const sample = path.join(samples.dir, file)
    const received = await getReceivedImage(receivablesDir, source, file)
    const imagesLookAlike = await areImagesLooksAlike(sample, received)
    t.true(imagesLookAlike, file + ' is different')
  }
}

function clearDir (dir) {
  if (fs.existsSync(dir)) { rimraf.sync(dir) }
  fs.mkdirSync(dir)
}

function getReceivedImage (receivablesDir, source, file) {
  return new Promise(resolve => {
    supertest(app)
        .get(`/${source}/${path.parse(file).name}`)
        .redirects(1)
        .pipe(fs.createWriteStream(path.join(receivablesDir, file)))
        .on('finish', () => resolve(path.join(receivablesDir, file)))
  })
}
