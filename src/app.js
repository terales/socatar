// Error tracking
const opbeat = require('opbeat')

// Native Node.js modules
const path = require('path')

// Third party dependencies
const express = require('express')

// Load configuration, if called from test
require('dotenv').config()

module.exports = function configureApp () {
  const app = express()

  app.use(express.static(path.join(__dirname, 'public')))

  app.get('/:source/:user', [
    requireLocalMiddleware('setLoggerExtraContent'),
    requireLocalMiddleware('getImageUrl'),
    requireLocalMiddleware('sendUnmodifiedHeaderIfApplicable'),
    requireLocalMiddleware('filterNotFoundImages'),
    requireLocalMiddleware('streamImage')
  ])

  // Error handlers
  app.use(requireLocalMiddleware('imageNotFoundHandler'))
  app.use(opbeat.middleware.express())

  return app
}

function requireLocalMiddleware (name) {
  return require(path.join(__dirname, 'middleware', name))
}
