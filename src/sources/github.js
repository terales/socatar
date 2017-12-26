const request = require('request')
const getProperty = require('lodash.get')
const template = {
  method: 'POST',
  url: 'https://api.github.com/graphql',
  json: true,
  body: {
    query: `query { user(login:"{{username}}") {avatarUrl}}`
  },
  headers: {
    'Authorization': 'bearer ' + process.env.GITHUB_TOKEN,
    'User-Agent': 'terales'
  }
}

module.exports = async function getGitHubUrl (username) {
  const options = JSON.parse(JSON.stringify(template))
  options.body.query = options.body.query.replace('{{username}}', username)

  return new Promise((resolve, reject) => {
    request(options, (error, response, parsedBody) => {
      if (error) { throw new Error(error) }

      const url = getProperty(parsedBody, 'data.user.avatarUrl', '')
      return url ? resolve(url) : reject(new Error('404'))
    })
  })
}
