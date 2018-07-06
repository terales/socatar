// Third party dependencies
const Raven = require('raven')

module.exports = function setLoggerExtraContent (req, res, next) {
  Raven.setTagsContext({
    source: req.params.source,
    referer: req.headers['referer'] || ''
  })
  Raven.setUserContext({
    id: req.params.user
  })
  return next()
}
