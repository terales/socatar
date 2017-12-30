// Native Node.js modules
const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify

// Third party dependencies
const supertest = require('supertest')
const rimraf = require('rimraf')
const pixelmatch = require('pixelmatch')
const jpegParser = require('jpeg-js')

// Local modules
const app = require('./../../src/app')
const getSourceSamples = require('./../helpers/getSourceSamples')

module.exports = function validateReceivedImages (t, source) {
  const samples = getSourceSamples(source)
  const receivablesDir = path.join(__dirname, '..', 'sources', source, 'receivables')

  clearDir(receivablesDir)

  return Promise.all(samples.files.map(file =>
            Promise.all([
              path.join(samples.dir, file),
              getReceivedImage(receivablesDir, source, file)
            ]).then(images => {
              const sample = parseImage(images[0])
              const received = parseImage(images[1])
              const diff = pixelmatch(sample, received, null, sample.width, sample.height)
              t.is(diff, 0, file + ' is different')
            })
        )
    )
}

function clearDir (dir) {
  if (fs.existsSync(dir)) { rimraf.sync(dir) }
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

async function parseImage (file) {
  return jpegParser.decode(
    await promisify(fs.readFile)(file),
    true
  )
}
