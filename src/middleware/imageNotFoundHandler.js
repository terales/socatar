// Native Node.js modules
const path = require('path')

// Local modules
const fallback = path.join(__dirname, '..', 'public', 'fallback.svg')

module.exports = function imageNotFoundHandler (err, req, res, next) {
  if (res.headersSent || err.message !== '404') { return next(err) }
  res.header('cache-control', 'public, max-age=1209600, no-transform')
  res.status(404).sendFile(fallback)
}
