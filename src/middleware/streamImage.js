module.exports = function streamImage (req, res, next) {
  const sourceResponse = req.locals.source.response

  const notImage = sourceResponse.headers['content-type'].includes('image') === false
  const notFound = sourceResponse.statusCode === 404
  if (notImage || notFound) { return next(new Error('404')) }

  sourceResponse.headers['cache-control'] = 'public, max-age=1209600, no-transform'
  res.writeHead(sourceResponse.statusCode, sourceResponse.headers)
  return req.locals.source.request.pipe(res)
}
