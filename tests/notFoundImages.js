const request = require('request')

module.exports = function notFoundImages (t, source) {
  return new Promise(resolve => {
    request(`http://localhost:8383/${source}/definiteryWrongUserIdHere`, function (error, response) {
      t.falsy(error)
      t.is(response.statusCode, 404)
      resolve()
    })
  })
}
