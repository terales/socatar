module.exports = function sendUnmodifiedHeaderIfApplicable (req, res, next) {
  if (imageIsSameAsCached(req, req.locals.source.response)) {
    return res.status(304).end()
  }

  next()
}

function imageIsSameAsCached (req, response) {
  const ifModified = req.headers['if-modified-since'] && req.headers['if-modified-since'] === response.headers['last-modified']
  const etag = req.headers['if-none-match'] && req.headers['if-none-match'] === response.headers['etag']
  return ifModified || etag
}
