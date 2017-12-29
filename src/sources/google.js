// Local modules
const fetchImageUrlFromSourceJson = require('./../common/fetchImageUrlFromSourceJson')

module.exports = async function getGoogleUrl (id) {
  return fetchImageUrlFromSourceJson(getOptions(id), 'image.url')
}

function getOptions (id) {
  return {
    url: `https://www.googleapis.com/plus/v1/people/${id}?fields=image/url&key=${process.env.GOOGLE_KEY}`,
    json: true
  }
}
