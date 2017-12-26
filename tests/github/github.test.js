const test = require('ava')
const fs = require('fs')
const path = require('path')
const request = require('request')
const crypto = require('crypto')
const rimraf = require('rimraf')

const samplesDir = path.join(__dirname, 'samples')
const receivablesDir = path.join(__dirname, 'receivables')

test.before(() => {
  if (fs.existsSync(receivablesDir)) { rimraf.sync(receivablesDir) }
  fs.mkdirSync(receivablesDir)
})

test('loads correct images', t => {
  return Promise.all(fs.readdirSync(samplesDir)
        .filter(file => file.match(/\.jpg$/))
        .map(file =>
            Promise.all([getSampleHash(file), getReceivedHash(file)])
                .then(hashes => t.is(hashes[0], hashes[1], file + ' is different'))
        )
    )
})

function getSampleHash (file) {
  return getFileHash(samplesDir, file)
}

function getReceivedHash (file) {
  return new Promise(resolve => {
    request('http://localhost:8383/github/' + file.slice(0, -4))
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
