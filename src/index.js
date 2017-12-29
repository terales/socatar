// Error tracking
const opbeat = require('opbeat')

// Native Node.js modules
const path = require('path')

// Third party dependencies
const express = require('express')
const request = require('request')
const safeSet = require('lodash.set')

// Load configuration
require('dotenv').config()

// Load local modules
const sources = require(path.join(__dirname, 'sources', 'index'))

//
// Configure app workflow
//
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/:source/:user', [
  setLoggerExtraContent,
  getImageUrl,
  sendUnmodifiedHeaderIfApplicable,
  streamImage
])

// Error handlers
app.use(imageNotFoundHandler)
app.use(opbeat.middleware.express())

module.exports = app

//
// Middleware
//
function setLoggerExtraContent (req, res, next) {
  opbeat.setExtraContext({
    source: req.params.source,
    user: req.params.user,
    referer: req.headers['referer'] ? req.headers['referer'] : ''
  })
  return next()
}

function getImageUrl (req, res, next) {
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

function sendUnmodifiedHeaderIfApplicable (req, res, next) {
  if (imageIsSameAsCached(req, req.locals.source.response)) {
    return res.status(304).end()
  }

  next()
}

function streamImage (req, res, next) {
  const sourceResponse = req.locals.source.response
  if (sourceResponse.headers['content-type'].includes('image') === false) { return next() }

  sourceResponse.headers['cache-control'] = 'public, max-age=1209600, no-transform'
  res.writeHead(sourceResponse.statusCode, sourceResponse.headers)
  return req.locals.source.request.pipe(res)
}

function imageNotFoundHandler (err, req, res, next) {
  if (!res.headersSent && err.message === '404') {
    return res.status(404).end()
  }

  return next(err)
}

function imageIsSameAsCached (income, response) {
  const etag = income.headers['if-none-match'] && income.headers['if-none-match'] === response.headers['etag']
  const ifModified = income.headers['if-modified-since'] && income.headers['if-modified-since'] === response.headers['last-modified']
  return etag || ifModified
}
