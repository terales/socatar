// Native Node.js modules
const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify

// Third party dependencies
const supertest = require('supertest')
const rimraf = require('rimraf')
const compareImages = require('resemblejs/compareImages')

// Local modules
const app = require('./../../src/app')
const getSourceSamples = require('./../helpers/getSourceSamples')

const readFile = promisify(fs.readFile)

module.exports = function validateReceivedImages (t, source) {
  const samples = getSourceSamples(source)
  const receivablesDir = path.join(__dirname, '..', 'sources', source, 'receivables')

  clearDir(receivablesDir)

  return Promise.all(samples.files.map(file =>
            Promise.all([
              path.join(samples.dir, file),
              getReceivedImage(receivablesDir, source, file)
            ]).then(async images => {
              return {
                sample: images[0],
                received: images[1],
                comparison: await compareImages(
                  await readFile(images[0]),
                  await readFile(images[1]),
                  { output: { outputDiff: false } }
                )
              }
            }).then(({sample, received, comparison}) => {
              t.true(comparison.isSameDimensions, printComparisonError(sample, received, comparison))
              t.true(comparison.rawMisMatchPercentage < 0.05, printComparisonError(sample, received, comparison))
            }).catch(error => t.fail(printComparisonError('', '', error)))
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

function printComparisonError (sample, received, comparison) {
  return 'Sample: ' + sample + '\n' +
  'Received: ' + received + '\n' +
  JSON.stringify(comparison, null, 2)
}
