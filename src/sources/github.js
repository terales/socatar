const request = require('request')
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

  return new Promise(resolve => {
    request(options, (error, response, parsedBody) => {
      if (error) {
        throw new Error(error)
      }

      resolve(parsedBody.data.user.avatarUrl)
    })
  })
}
