
module.exports = function getFacebookUrl (id) {
    // TODO Get ID from user name? https://findmyfbid.com/ to get ID from page link
  return `https://graph.facebook.com/${id}/picture?width=100&height=100`
}
