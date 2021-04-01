const app  = require('./app')
const config = require('./utils/config');
const logger = require('./utils/logger')

const http = require('http')
// const server = http.createServer(app)
// const app = express()
const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = app
