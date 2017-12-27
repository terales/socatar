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
        .then(url => {
          const image = request(url)
          image.on('response', response => {
            if (income.headers['if-none-match'] && income.headers['if-none-match'] === response.headers['etag']) {
              outcome.writeHead(304)
              return outcome.end()
            }

            if (response.headers['content-type'].includes('image')) {
              response.headers['cache-control'] = 'public, max-age=1209600, no-transform'
              outcome.writeHead(response.statusCode, response.headers)
              return image.pipe(outcome)
            }

            return send404Error(outcome)
          })
        })
        .catch(error => {
          if (error instanceof Error === false) { error = new Error(error) }

          if (error.message === '404') { return send404Error(outcome) }

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
  opbeat.setTransactionName(`/index.html`)
  response.writeHeader(200, {'Content-Type': 'text/html'})
  return require('fs').createReadStream(path.join(__dirname, 'index.html')).pipe(response)
}

function sendFavicon (response) {
  opbeat.setTransactionName('/favicon.ico')
  response.writeHeader(200, {'Content-Type': 'image/x-icon'})
  return require('fs').createReadStream(path.join(__dirname, 'favicon.ico')).pipe(response)
}

function send404Error (response) {
  response.writeHead(404, {'Content-Type': 'text/plain'})
  response.write('404 Not found')
  return response.end()
}
