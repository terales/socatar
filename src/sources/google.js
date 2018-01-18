// Local modules
const fetchImageUrlFromSourceJson = require('./../common/fetchImageUrlFromSourceJson')

module.exports = async function getGoogleUrl (email) {
  return fetchImageUrlFromSourceJson({
    url: `http://picasaweb.google.com/data/entry/api/user/${email}?alt=json`,
    headers: { 'GData-Version': 3 },
    json: true
  }, 'entry.gphoto$thumbnail.$t')
}
