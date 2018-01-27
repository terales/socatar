// Third party dependencies
const cloudinary = require('cloudinary')

module.exports = function redirectToCloudinary (req, res, next) {
  res.header('cache-control', 'public, max-age=1209600, no-transform')
  return res.redirect(302, getCloudinaryUrl(req.locals.url, req.params.width, req.params.height))
}

function getCloudinaryUrl (url, width = 100, height = 100) {
  return cloudinary.url(url, {
    type: 'fetch',
    sign_url: true,
    transformation: [{
      height: width,
      width: height,
      crop: 'thumb',
      gravity: 'faces',
      fetch_format: 'auto',
      default_image: process.env.CLOUDINARY_FALLBACK_IMAGE,
      secure: true,
      cdn_subdomain: true
    }]
  })
}
