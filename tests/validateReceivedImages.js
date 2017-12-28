const fs = require('fs')
const path = require('path')
const request = require('request')
const crypto = require('crypto')
const rimraf = require('rimraf')

const getSourceSamples = require('./getSourceSamples')

module.exports = function validateReceivedImages (t, source) {
  const samplesDir = path.join(__dirname, source, 'samples')
  const receivablesDir = path.join(__dirname, source, 'receivables')

  clearDir(receivablesDir)

  return Promise.all(getSourceSamples(samplesDir).map(file =>
            Promise.all([
              getFileHash(samplesDir, file),
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
    const received = request(`http://localhost:8383/${source}/` + path.parse(file).name)
    received.on('response', response => {
      if (response.statusCode > 200) { throw new Error(`${source}/${file} receivable returned non-ok status: ` + response.statusCode) }
      if (response.headers['content-type'].includes('image') === false) { throw new Error(`${source}/${file} receivable returned non-image content`) }
      console.log(`${source}/${file}`, response.statusCode, response.headers)

      response
        .pipe(fs.createWriteStream(path.join(receivablesDir, file)))
        .on('close', () => resolve(getFileHash(receivablesDir, file)))
    })

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
