// Third party dependencies
const request = require('request')
const safeSet = require('lodash.set')

module.exports = function getImageRequest (req, res, next) {
    const image = request(req.locals.url)
    image.on('response', response => {
        safeSet(req, 'locals.source', { request: image, response })
        return next()
    })
}
