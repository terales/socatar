// Error tracking
require('opbeat').start()

// Load configuration
require('dotenv').config()

const app = require('./app')()

app.listen(process.env.PORT, () => console.log('App listening on port ' + process.env.PORT))
