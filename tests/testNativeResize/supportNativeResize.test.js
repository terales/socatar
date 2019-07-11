// Native Node.js modules
const fs = require('fs')
const path = require('path')

// Third party dependencies
const test = require('ava')
const rimraf = require('rimraf')

const app = require('./../../src/app')()

// Test helpers
const testRunner = require('./../helpers/runForPullRequestFromFork')('github') ? test : test.skip
const getImagesFromFolder = require('./../helpers/getImagesFromFolder')
const imageMagicCompare = require('./../helpers/imageMagicCompare')
const saveReceivedImage = require('./../helpers/saveReceivedImage')

testRunner('Should return required size without Cloudinary if source supports it', async t => {
  const receivablesDir = path.join(__dirname, 'receivables')
  const samplesDir = path.join(__dirname, 'samples')
  const samples = getImagesFromFolder(samplesDir).map(decomposeSample)
  clearDir(receivablesDir)

  t.plan(samples.length)

  for (const sample of samples) {
    const route = `/${sample.source}/${sample.user}/${sample.size}-${sample.size}`
    const received = await saveReceivedImage(app, route, receivablesDir, path.parse(sample.path).base)
    const isEqual = await imageMagicCompare(path.join(samplesDir, sample.path), received)
    t.true(isEqual, 'Received unexpected image: ' + route)
  }
})

function decomposeSample (sample) {
  const parts = path.parse(sample).name.split('-')
  return {
    path: sample,
    source: parts[0],
    user: parts[1],
    size: parts[2]
  }
}

function clearDir (dir) {
  rimraf.sync(dir)
  fs.mkdirSync(dir)
}
