const fs = require('fs')
const path = require('path')
const request = require('request')
const crypto = require('crypto')
const rimraf = require('rimraf')

module.exports = function validateReceivedImages (t, source) {
  const samplesDir = path.join(__dirname, source, 'samples')
  const receivablesDir = path.join(__dirname, source, 'receivables')

  clearDir(receivablesDir)

  return Promise.all(fs.readdirSync(samplesDir)
        .filter(file => ['png', 'jpg', 'jpeg'].includes(path.parse(file).ext.slice(1)))
        .map(file =>
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
    request(`http://localhost:8383/${source}/` + path.parse(file).name)
        .pipe(fs.createWriteStream(path.join(receivablesDir, file)))
        .on('close', () => resolve(getFileHash(receivablesDir, file)))
  })
}

function getFileHash (dir, file) {
  return new Promise(resolve => {
    const hash = crypto.createHash('sha1')
    const stream = fs.ReadStream(path.join(dir, file))
    stream.on('data', data => hash.update(data))
    stream.on('end', () => resolve(hash.digest('hex')))
  })
}
