const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const crypto = require('crypto')
const rimraf = require('rimraf')

const app = require('./../../src/app')
const getSourceSamples = require('./../helpers/getSourceSamples')

module.exports = function validateReceivedImages (t, source) {
  const samples = getSourceSamples(source)
  const receivablesDir = path.join(__dirname, '..', 'sources', source, 'receivables')

  clearDir(receivablesDir)

  return Promise.all(samples.files.map(file =>
            Promise.all([
              getFileHash(samples.dir, file),
              getReceivedHash(receivablesDir, source, file)
            ]).then(hashes => t.is(hashes[0], hashes[1], file + ' is different'))
        )
    )
}

function clearDir (dir) {
  if (fs.existsSync(dir)) { rimraf.sync(dir) }
  fs.mkdirSync(dir)
}

function getReceivedHash (receivablesDir, source, file) {
  return new Promise(resolve => {
    supertest(app)
        .get(`/${source}/` + path.parse(file).name)
        .pipe(fs.createWriteStream(path.join(receivablesDir, file)))
        .on('close', () => resolve(getFileHash(receivablesDir, file)))
  })
}

function getFileHash (dir, file) {
  return new Promise(resolve => {
    const hash = crypto.createHash('sha1')
    hash.on('readable', () => {
      const result = hash.read()
      if (result) { resolve(result.toString('hex')) }
    })

    fs.ReadStream(path.join(dir, file)).pipe(hash)
  })
}