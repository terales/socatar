const opbeat = require('opbeat').start()

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
  if (income.url === '/' || income.url === '') { return sendHomePage(outcome) }
  if (income.url === '/favicon.ico') { return sendFavicon(outcome) }

  const {source, user} = parseUrl(income.url)

  if (!source || !sources[source]) { return send404Error(outcome) }

  opbeat.setTransactionName(`/${source}/{id}`)
  opbeat.setExtraContext({source, user})

  Promise.resolve(sources[source](user))
        .then(image => request(image).pipe(outcome))
        .catch(msg => {
          const error = new Error(msg)
          opbeat.captureError(error)
          throw error
        })
}

function parseUrl (raw) {
  const parsed = url.parse(raw).pathname.slice(1).split('/')
  return {
    source: parsed[0],
    user: parsed[1]
  }
}

function sendHomePage (response) {
  response.writeHeader(200, {'Content-Type': 'text/html'})
  return require('fs').createReadStream(path.join(__dirname, 'index.html')).pipe(response)
}

function sendFavicon (response) {
  response.writeHeader(200, {'Content-Type': 'image/x-icon'})
  return require('fs').createReadStream(path.join(__dirname, 'favicon.ico')).pipe(response)
}

function send404Error (response) {
  response.writeHead(404, {'Content-Type': 'text/plain'})
  response.write('404 Not found')
  return response.end()
}
