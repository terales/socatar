// Third party dependencies
const opbeat = require('opbeat')

module.exports = function setLoggerExtraContent (req, res, next) {
  opbeat.setExtraContext({
    source: req.params.source,
    user: req.params.user,
    referer: req.headers['referer'] ? req.headers['referer'] : ''
  })
  return next()
}
