
// Third party dependencies
const cloudinary = require('cloudinary')

module.exports = function redirectToCloudinary (req, res, next) {
  res.header('cache-control', 'public, max-age=1209600, no-transform')
  return res.redirect(302, getCloudinaryUrl(req.locals.url))
}

function getCloudinaryUrl (url) {
    // TODO Use Cloudflare built in integrations with some sources: https://cloudinary.com/documentation/facebook_profile_pictures
  return cloudinary.url(url, {
    type: 'fetch',
    sign_url: true,
    transformation: [
      { // TODO Make it possible to set up width/height from URL: /github/terales/100x100
        height: 30,
        width: 30,
        crop: 'thumb',
        gravity: 'faces',
        fetch_format: 'auto',
        default_image: process.env.CLOUDINARY_FALLBACK_IMAGE,
        secure: true,
        cdn_subdomain: true
      }]
  })
}
