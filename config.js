const dotenv = require('dotenv')

dotenv.config()

const config = {
  ENV: process.env.NODE_ENV,
  MONGODB_URL: process.env.MONGODB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  PAGE_LIMIT: 6
}

module.exports = config
