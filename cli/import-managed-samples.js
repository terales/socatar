const path = require('path')
const fs = require('fs')

const request = require('request')

const getSourceSamples = require(path.join(__dirname, '..', 'helpers', 'samples-managed'))
const sources = ['facebook', 'github', 'google', 'gravatar', 'twitter']

const requests = []

sources.forEach(source => {
  const samples = getSourceSamples(source, 'community')
  const targetDir = path.join(samples.dir, '..', 'samples-managed')
  samples.files.forEach(sample => {
    requests.push(new Promise(resolve => {
      request(`http://localhost:8383/${source}/${path.parse(sample).name}`)
                .pipe(fs.createWriteStream(path.join(targetDir, path.parse(sample).name + '.png')))
                .on('finish', () => resolve())
    }))
  })
})

Promise.all(requests)
    .then(() => console.log('Finished'))
    .catch(e => { throw e })
