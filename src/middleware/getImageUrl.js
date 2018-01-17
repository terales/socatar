// Native Node.js modules
const path = require('path')

// Third party dependencies
const safeSet = require('lodash.set')

// Local modules
const sources = require(path.join(__dirname, '..', 'sources', 'index'))

module.exports = function getImageUrl (req, res, next) {
  const source = sources[req.params.source]

  if (!source) { throw new Error('404') }

  Promise.resolve(source(req.params.user))
    .then(url => {
      safeSet(req, 'locals.url', url)
      return next()
    })
    .catch(err => next(err))
}
