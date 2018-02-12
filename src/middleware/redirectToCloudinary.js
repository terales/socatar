// Third party dependencies
const cloudinary = require('cloudinary')

module.exports = function redirectToCloudinary (req, res, next) {
  res.header('cache-control', 'public, max-age=1209600, no-transform')
  return res.redirect(302, getCloudinaryUrl(req.locals.url, req.params.width, req.params.height))
}

function getCloudinaryUrl (url, width = 100, height = 100) {
  const transformation = {
    fetch_format: 'auto',
    default_image: process.env.CLOUDINARY_FALLBACK_IMAGE
  }

  if (width !== -1) {
    Object.assign(transformation, {
      height: width,
      width: height,
      crop: 'thumb',
      gravity: 'faces'
    })
  }

  return cloudinary.url(url, {
    type: 'fetch',
    sign_url: true,
    secure: true,
    cdn_subdomain: true,
    transformation: [transformation]
  })
}
