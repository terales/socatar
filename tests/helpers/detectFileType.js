// Third party dependencies
const readChunk = require('read-chunk')
const fileType = require('file-type')

module.exports = function detectFileType (file) {
  return fileType(readChunk.sync(file, 0, 150)).ext
}
