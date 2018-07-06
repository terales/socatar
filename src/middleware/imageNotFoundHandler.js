// Native Node.js modules
const fs = require('fs')
const path = require('path')

// Local modules
const fallbackPath = path.join(__dirname, '..', 'public', 'fallback.svg')
const fallbackStr = fs.readFileSync(fallbackPath, 'utf8')

module.exports = function imageNotFoundHandler (err, req, res, next) {
  if (res.headersSent || err.message !== '404') { return next(err) }
  res.header('cache-control', 'public, max-age=1209600, no-transform')
  res.header('content-type', 'image/svg+xml')
  res.status(404)

  if (res.locals.width === -1 && res.locals.height === -1) {
    // 100% width, 100% height placeholder
    res.sendFile(fallbackPath)
  } else {
    // placeholder with requested size
    res.send(
      fallbackStr
        .replace('width="100"', `width="${res.locals.width}"`)
        .replace('height="100"', `height="${res.locals.height}"`)
    )
  }
}
