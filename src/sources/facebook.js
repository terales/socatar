// Third party dependencies
const request = require('request')
const StreamSearch = require('streamsearch')

module.exports = function getFacebookUrl (user, width, height) {
  if (Number.isNaN(user)) { return fetchFromId(user, width, height) }
  return fetchFromSlug(user, width, height)
}

function fetchFromId (id, width, height) {
  let url = `https://graph.facebook.com/${id}/picture`
  if (width !== -1) { url += `?width=${width}&height=${height}` }
  return url
}

async function fetchFromSlug (slug, width, height) {
  return new Promise((resolve, reject) => {
    const res = request({
      url: 'https://www.facebook.com/' + slug,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36' }
    })

    const search = getSearcher(id => {
      res.abort()
      resolve(fetchFromId(id, width, height))
    })
    res.on('response', response => { if (response.statusCode === 404) reject(new Error('404')) })
    res.on('data', (data) => search.push(data))
  })
}

function getSearcher (onMatch) {
  const needle = '"fb://profile/'
  const search = new StreamSearch(needle)
  search.on('info', (isMatch, data) => {
    if (isMatch && data) { getIdFromHtml(data.toString('utf8'), onMatch) }
  })
  return search
}

function getIdFromHtml (html, cb) {
  const pattern = /"fb:\/\/profile\/([0-9]+)"/
  const match = html.match(pattern)
  if (match && match[1]) {
    return cb(parseInt(match[1]))
  }
}
