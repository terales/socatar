// Local modules
const fetchImageUrlFromSourceJson = require('./../common/fetchImageUrlFromSourceJson')

module.exports = async function getGitHubUrl (username) {
  return fetchImageUrlFromSourceJson(getOptions(username), 'data.user.avatarUrl')
}

function getOptions (username) {
  return {
    method: 'POST',
    url: 'https://api.github.com/graphql',
    json: true,
    body: {
      query: `query { user(login:"${username}") {avatarUrl}}`
    },
    headers: {
      'Authorization': 'bearer ' + process.env.GITHUB_TOKEN,
      'User-Agent': 'terales'
    }
  }
}
