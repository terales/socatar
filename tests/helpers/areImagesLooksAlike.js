// Native Node.js modules
const fs = require('fs')
const promisify = require('util').promisify

// Third party dependencies
const pixelmatch = require('pixelmatch')
const jpegParser = require('jpeg-js')
const PngParser = require('pngjs').PNG

// Local modules
const detectFileType = require('./../helpers/detectFileType')

module.exports = async function areImagesLooksAlike (samplePath, receivedPath) {
  const ext = detectFileType(samplePath)

  if (['xml', 'svg'].includes(ext)) {
    return fs.statSync(samplePath).size === fs.statSync(receivedPath).size
  }

  const sample = await parseImage(samplePath, ext)
  const received = await parseImage(receivedPath, ext)
  const difference = pixelmatch(sample, received, null, sample.width, sample.height)
  return difference < 0.01
}

async function parseImage (file, ext) {
  const parsers = {
    jpg: parseJpg,
    jpeg: parseJpg,
    png: parsePng
  }
  return parsers[ext](file)
}

async function parseJpg (file) {
  return jpegParser.decode(
    await promisify(fs.readFile)(file),
    true
  )
}

async function parsePng (file) {
  return new Promise(resolve => {
    const png = fs.createReadStream(file).pipe(new PngParser())
    png.on('parsed', function () { resolve(this) }) // Using regular function because PngParser modifies `this`
    png.on('error', error => { throw error })
  })
}
