const crypto = require('crypto')

module.exports = function getGravatarUrl (email, width) {
  const md5 = crypto.createHash('md5').update(email).digest('hex')
  let url = `http://www.gravatar.com/avatar/${md5}?d=404`
  if (width !== -1) { url += `&s=${width}` }
  return url
}
