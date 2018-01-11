// Native Node.js modules
const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify

// Third party dependencies
const supertest = require('supertest')
const rimraf = require('rimraf')
const pixelmatch = require('pixelmatch')
const jpegParser = require('jpeg-js')
const PngParser = require('pngjs').PNG

// Local modules
const app = require('./../../src/app')('community')
const getSourceSamples = require('./../helpers/getSourceSamples')
const detectFileType = require('./../helpers/detectFileType')

module.exports = async function validateReceivedImages (t, source) {
  const samples = getSourceSamples(source, 'community')
  const receivablesDir = path.join(__dirname, '..', 'sources', source, 'receivables-community')

  clearDir(receivablesDir)

  t.plan(samples.files.length)

  for (let file of samples.files) {
    const sample = await parseImage(path.join(samples.dir, file))
    const received = await parseImage(getReceivedImage(receivablesDir, source, file))
    const diff = pixelmatch(sample, received, null, sample.width, sample.height)
    t.is(diff, 0, file + ' is different')
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
        .pipe(fs.createWriteStream(path.join(receivablesDir, file)))
        .on('finish', () => resolve(path.join(receivablesDir, file)))
  })
}

async function parseImage (file) {
  const image = await file
  const ext = detectFileType(image)
  if (!ext) { throw new Error(`Can't detect image type. Size: ${fs.statSync(image).size}, path: ${image}`) }

  const parsers = {
    jpg: parseJpg,
    jpeg: parseJpg,
    png: parsePng
  }

  if (!parsers[ext]) { throw new Error(`No parser for ${ext} available. Size: ${fs.statSync(image).size}, path: ${image}`) }

  return parsers[ext](image)
}

async function parseJpg (file) {
  try {
    return jpegParser.decode(
      await promisify(fs.readFile)(file),
      true
    )
  } catch (error) {
    console.log(error)
  }
}

async function parsePng (file) {
  return new Promise(resolve => {
    const png = fs.createReadStream(file).pipe(new PngParser())
    png.on('parsed', function () { resolve(this) }) // Using regular function because PngParser modifies `this`
    png.on('error', error => { throw error })
  })
}
