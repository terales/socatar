const crypto = require('crypto')

module.exports = function getGravatarUrl (email) {
  const md5 = crypto.createHash('md5').update(email).digest('hex')
  return `http://www.gravatar.com/avatar/${md5}?s=100`
}
