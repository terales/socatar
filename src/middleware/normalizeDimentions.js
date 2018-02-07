module.exports = function normalizeDimentions (req, res, next) {
  const getOriginal = req.path.split('/').pop() === 'original'

  if (validateDimentionsIfPresent(req.params)) {
    return res.status(400).send('Invalid image dimentions. Width and height should be integers from 1 to 599')
  }

  req.params = Object.assign({
    width: getOriginal ? -1 : process.env.AVATAR_WIDTH,
    height: getOriginal ? -1 : process.env.AVATAR_HEIGHT
  }, req.params)
  next()
}

function validateDimentionsIfPresent ({width, height}) {
  return (width || height) && (!validate(width) || !validate(height))
}

function validate (dimention) {
  const parsed = Number.parseInt(dimention)
  return !Number.isNaN(parsed) &&
    parseInt(parsed) < 600 &&
    parseInt(parsed) > 0
}
