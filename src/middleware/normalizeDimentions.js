module.exports = function normalizeDimentions (req, res, next) {
  if (req.params.width || req.params.height) {
    if (!validate(req.params.width) || !validate(req.params.height)) {
      return res.status(400).send('Invalid image dimentions. Width and height should be integers from 1 to 599')
    }
  } else {
    req.params.width = 100
    req.params.height = 100
  }

  next()
}

function validate (dimention) {
  const parsed = Number.parseInt(dimention)
  return !Number.isNaN(parsed) &&
    parseInt(parsed) < 600 &&
    parseInt(parsed) > 0
}
