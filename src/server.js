// Error tracking
require('opbeat').start()

// Load configuration
require('dotenv').config()

const app = require('./app')(!process.env.CLOUDINARY_URL)

app.listen(process.env.PORT, () => console.log('App listening on port ' + process.env.PORT))
