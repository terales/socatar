const fs = require('fs')
const path = require('path')

module.exports = function getSourceSamples (source) {
  const dir = path.join(__dirname, '..', 'sources', source, 'samples')
  return {
    dir,
    files: fs.readdirSync(dir)
      .filter(file => ['png', 'jpg', 'jpeg'].includes(path.parse(file).ext.slice(1)))
  }
}
