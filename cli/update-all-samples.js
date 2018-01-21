const fs = require('fs')
const path = require('path')

const request = require('request')
const rimraf = require('rimraf')

const getSourceSamples = require(path.join(__dirname, '..', 'tests', 'helpers', 'getSourceSamples'))
const sources = Object.keys(require(path.join(__dirname, '..', 'src', 'sources', 'index')))

const requests = []

sources.forEach(source => {
  const samples = getSourceSamples(source)

  rimraf.sync(samples.dir)
  fs.mkdirSync(samples.dir)

  samples.files.forEach(sample => {
    requests.push(new Promise(resolve => {
      let name = path.parse(sample).name
      const targetFile = path.join(samples.dir, name)
      const req = request(`http://localhost:8383/${source}/${name}`)
      req.on('response', res => {
        let ext = '.' + res.headers['content-type'].split('/')[1]
        req.pipe(fs.createWriteStream(targetFile + ext)).on('finished', () => resolve())
      })
    }))
  })
})

Promise
  .all(requests)
  .then(() => console.log('Finished'))
  .catch(e => { throw e })
