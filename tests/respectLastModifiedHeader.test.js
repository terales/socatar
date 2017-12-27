const test = require('ava')
const request = require('request')

test('Should not pipe body if there is a matching if-modified-since', t => {
  return new Promise(resolve => {
    request({
      url: 'http://localhost:8383/twitter/terales_',
      headers: { 'if-modified-since': 'Tue, 14 Nov 2017 20:13:41 GMT' }
    }, (error, response, body) => {
      t.is(response.statusCode, 304)
      t.falsy(body)
      t.falsy(error)
      resolve()
    })
  })
})
