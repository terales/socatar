const test = require('ava')
const request = require('request')

test('Should not pipe body if there is a matching ETag', t => {
  return new Promise(resolve => {
    request({
      url: 'http://localhost:8383/google/+SriramSaroop',
      headers: { 'if-none-match': '"v30b6"' }
    }, (error, response, body) => {
      t.is(response.statusCode, 304)
      t.falsy(body)
      t.falsy(error)
      resolve()
    })
  })
})
