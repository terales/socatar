
module.exports = function filterOurSourcesWithSecureCredentials (source) {
  return !process.env.TRAVIS_PULL_REQUEST ||
    process.env.TRAVIS_PULL_REQUEST === 'false' ||
    ['google', 'github'].includes(source) === false
}
