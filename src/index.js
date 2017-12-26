const http = require('http')
const url = require('url')
const request = require('request')
const path = require('path')

require('dotenv').config()
const sources = require(path.join(__dirname, 'sources', 'index'))

const server = http.createServer(route)
server.listen({
  host: process.env.HOST,
  port: process.env.PORT,
  exclusive: true
}, () => { console.log('Listening at ', server.address()) })

function route (income, outcome) {
  const {source, user} = parseUrl(income.url)

  if (!source || !sources[source]) { return send404Error(outcome) }

  Promise.resolve(sources[source](user))
        .then(image => request(image).pipe(outcome))
        .catch(msg => { throw new Error(msg) })
}

function parseUrl (raw) {
  const parsed = url.parse(raw).pathname.slice(1).split('/')
  return {
    source: parsed[0],
    user: parsed[1]
  }
}

function send404Error (response) {
  response.writeHead(404, {'Content-Type': 'text/plain'})
  response.write('404 Not found')
  return response.end()
}
