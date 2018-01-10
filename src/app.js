// Error tracking
const opbeat = require('opbeat')

// Native Node.js modules
const path = require('path')

// Third party dependencies
const express = require('express')

// Load configuration
require('dotenv').config()

module.exports = function configureApp (tier) {
  const app = express()

  app.use(express.static(path.join(__dirname, 'public'), {
    index: tier === 'managed' ? 'managed.html' : 'index.html'
  }))

  const workflow = []

  if (tier === 'managed') {
    workflow.push(requireLocalMiddleware('setLoggerExtraContent'))
    workflow.push(requireLocalMiddleware('getImageUrl'))
    workflow.push(requireLocalMiddleware('redirectToCloudinary'))
  } else {
    workflow.push(requireLocalMiddleware('setLoggerExtraContent'))
    workflow.push(requireLocalMiddleware('getImageUrl'))
    workflow.push(requireLocalMiddleware('getImageRequest'))
    workflow.push(requireLocalMiddleware('sendUnmodifiedHeaderIfApplicable'))
    workflow.push(requireLocalMiddleware('filterNotFoundImages'))
    workflow.push(requireLocalMiddleware('streamImage'))
  }

  app.get('/:source/:user', workflow)

  // Error handlers
  app.use(requireLocalMiddleware('imageNotFoundHandler'))
  app.use(opbeat.middleware.express())

  return app
}

function requireLocalMiddleware (name) {
  return require(path.join(__dirname, 'middleware', name))
}
