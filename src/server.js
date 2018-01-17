// Error tracking
require('opbeat').start()

const app = require('./app')(process.env.TIER)

app.listen(process.env.PORT, () =>
    console.log(process.env.TIER + ' app listening on port ' + process.env.PORT)
)
