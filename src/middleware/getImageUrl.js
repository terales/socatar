// Native Node.js modules
const path = require('path')

// Third party dependencies
const request = require('request')
const safeSet = require('lodash.set')

// Local modules
const sources = require(path.join(__dirname, '..', 'sources', 'index'))

module.exports = function getImageUrl (req, res, next) {
  Promise.resolve(sources[req.params.source](req.params.user))
      .then(url => {
        const image = request(url)
        image.on('response', response => {
          safeSet(req, 'locals.source', { request: image, response })
          return next()
        })
      })
      .catch(err => next(err))
}
