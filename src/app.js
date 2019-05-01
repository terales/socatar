// Native Node.js modules
const path = require('path')

// Third party dependencies
const express = require('express')

// Load configuration, if called from test
require('dotenv').config()

// Error tracking
const Raven = require('raven')
if (process.env.NODE_ENV !== 'production') { // Disable error tracker for non-production environments
  Raven.disableConsoleAlerts()
}
Raven.config().install()

module.exports = function configureApp (useCloudinary = false) {
  const app = express()

  // Error handler
  app.use(Raven.requestHandler())

  app.use(express.static(path.join(__dirname, 'public')))

  const workflow = []

  if (useCloudinary) {
    workflow.push(requireLocalMiddleware('normalizeDimentions'))
    workflow.push(requireLocalMiddleware('getImageUrl'))
    workflow.push(requireLocalMiddleware('redirectToCloudinary'))
  } else {
    workflow.push(requireLocalMiddleware('normalizeDimentions'))
    workflow.push(requireLocalMiddleware('getImageUrl'))
    workflow.push(requireLocalMiddleware('getImageRequest'))
    workflow.push(requireLocalMiddleware('sendUnmodifiedHeaderIfApplicable'))
    workflow.push(requireLocalMiddleware('filterNotFoundImages'))
    workflow.push(requireLocalMiddleware('streamImage'))
  }

  // Routes
  app.get('/:source/:user', workflow)
  app.get('/:source/:user/:width-:height', workflow)
  app.get('/:source/:user/original', workflow)

  // Error handlers
  app.use(requireLocalMiddleware('imageNotFoundHandler'))
  app.use(Raven.errorHandler())

  return app
}

function requireLocalMiddleware (name) {
  return require(path.join(__dirname, 'middleware', name))
}
