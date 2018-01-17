const fs = require('fs')
const path = require('path')

const request = require('request')
const rimraf = require('rimraf')

const getSourceSamples = require(path.join(__dirname, '..', 'tests', 'helpers', 'getSourceSamples'))
const sources = ['facebook', 'github', 'google', 'gravatar', 'twitter']

const requests = []

sources.forEach(source => {
  const samples = getSourceSamples(source, 'community')
  const targetDir = path.join(samples.dir, '..', 'samples-managed')

  rimraf.sync(targetDir)
  fs.mkdirSync(targetDir)

  samples.files.forEach(sample => {
    requests.push(new Promise(resolve => {
      let ext = ''
      const targetFile = path.join(targetDir, path.parse(sample).name)
      const req = request(`http://localhost:8383/${source}/${path.parse(sample).name}`)
      req.on('response', res => {
        ext = '.' + res.headers['content-type'].split('/')[1]
        req.pipe(fs.createWriteStream(targetFile + ext)).on('finished', () => resolve())
      })
    }))
  })
})

Promise.all(requests)
    .then(() => console.log('Finished'))
    .catch(e => { throw e })
