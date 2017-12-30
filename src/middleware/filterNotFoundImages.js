module.exports = function filterNotFoundImages (req, res, next) {
  const sourceResponse = req.locals.source.response

  const notImage = sourceResponse.headers['content-type'].includes('image') === false
  const notFound = sourceResponse.statusCode === 404
  if (notImage || notFound) { return next(new Error('404')) }

  next()
}
