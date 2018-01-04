
module.exports = function runForPullRequestFromFork (source) {
  if (source === 'google' && !process.env.GOOGLE_KEY) { return false }

  if (source === 'github' && !process.env.GITHUB_TOKEN) { return false }

  return true
}
