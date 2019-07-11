// Native Node.js modules
const fs = require('fs')
const path = require('path')

// Third party dependencies
const rimraf = require('rimraf')

// Test helpers
const getImagesFromFolder = require('./../helpers/getImagesFromFolder')
const imageMagicCompare = require('./../helpers/imageMagicCompare')
const saveReceivedImage = require('./../helpers/saveReceivedImage')

module.exports = async function validateReceivedImagesOneSample (t, app, testDirName, receivablesDirName) {
  const receivablesDir = path.join(testDirName, receivablesDirName)
  const samplesDir = path.join(testDirName, 'samples')
  const samples = getImagesFromFolder(samplesDir).map(decomposeSample)
  clearDir(receivablesDir)

  t.plan(samples.length)

  for (const sample of samples) {
    const route = `/${sample.source}/${sample.user}/original`
    const received = await saveReceivedImage(app, route, receivablesDir, path.parse(sample.path).base)
    const isEqual = await imageMagicCompare(path.join(samplesDir, sample.path), received)
    t.true(isEqual, 'Received unexpected image: ' + route)
  }
}

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
