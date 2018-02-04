const fs = require('fs')
const path = require('path')

module.exports = function getImagesFromFolder (dir) {
  return fs.readdirSync(dir).filter(
    file => ['png', 'jpg', 'jpeg'].includes(path.parse(file).ext.slice(1))
  )
}
