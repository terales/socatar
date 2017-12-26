const path = require('path')

module.exports = require('fs')
    .readdirSync(__dirname)
    .filter(file => !(file.match(/\.js$/) === null || file === 'index.js'))
    .map(file => file.slice(0, -3))
    .reduce((sources, source) => {
      sources[source] = require(path.join(__dirname, source))
      return sources
    }, {})
