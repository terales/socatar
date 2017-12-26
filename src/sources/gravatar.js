const md5 = require('crypto').createHash('md5')

module.exports = function getGravatarUrl (email) { // terehov.alexander.serg@gmail.com
  return `http://www.gravatar.com/avatar/${md5.update(email).digest('hex')}?s=100`
}
