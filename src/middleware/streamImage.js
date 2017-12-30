module.exports = function streamImage (req, res, next) {
  const sourceResponse = req.locals.source.response
  sourceResponse.headers['cache-control'] = 'public, max-age=1209600, no-transform'
  res.writeHead(sourceResponse.statusCode, sourceResponse.headers)
  return req.locals.source.request.pipe(res)
}
