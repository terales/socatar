// Native Node.js modules
const fs = require('fs')
const path = require('path')

// Third party dependencies
const supertest = require('supertest')

module.exports = function getReceivedImage (app, route, dir, filename) {
  const saved = path.join(dir, filename)
  return new Promise(resolve => {
    supertest(app)
      .get(route)
      .redirects(1) // for Cloudinary support
      .pipe(fs.createWriteStream(saved))
      .on('finish', () => resolve(saved))
  })
}
