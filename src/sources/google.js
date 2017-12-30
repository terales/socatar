// Local modules
const fetchImageUrlFromSourceJson = require('./../common/fetchImageUrlFromSourceJson')

module.exports = async function getGoogleUrl (id) {
  if (id.includes('@')) { return fetchFromPicasa(id) }
  if (id.startsWith('+')) { return fetchFromGooglePlus(id) }
  throw new Error('404')
}

async function fetchFromGooglePlus (id) {
  return fetchImageUrlFromSourceJson({
    url: `https://www.googleapis.com/plus/v1/people/${id}?fields=image/url&key=${process.env.GOOGLE_KEY}`,
    json: true
  }, 'image.url')
}

async function fetchFromPicasa (email) {
  return fetchImageUrlFromSourceJson({
    url: `http://picasaweb.google.com/data/entry/api/user/${email}?alt=json`,
    headers: { 'GData-Version': 3 },
    json: true
  }, 'entry.gphoto$thumbnail.$t')
}
