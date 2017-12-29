module.exports = function imageNotFoundHandler (err, req, res, next) {
  if (!res.headersSent && err.message === '404') {
    return res.status(404).end()
  }

  return next(err)
}
