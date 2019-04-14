
module.exports = function runForPullRequestFromFork (source) {
  if (source === 'github' && !process.env.GITHUB_TOKEN) { return false }

  return true
}
