// Error tracking
require('opbeat').start()

const app = require('./index')

app.listen(process.env.PORT, () => console.log('App listening on port ' + process.env.PORT))
