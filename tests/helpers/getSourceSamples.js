// Native Node.js modules
const path = require('path')

const getImagesFromFolder = require('./getImagesFromFolder')

module.exports = function getSourceSamples (source) {
  const dir = path.join(__dirname, '..', 'sources', source, 'samples')
  return {
    dir,
    files: getImagesFromFolder(dir)
  }
}
