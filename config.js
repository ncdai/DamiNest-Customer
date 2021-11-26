const dotenv = require('dotenv')

const getEnvFile = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '.env'
    case 'production':
      return '.env.production'
    default:
      return '.env'
  }
}

dotenv.config({
  path: getEnvFile()
})

const config = {
  ENV: process.env.NODE_ENV,
  MONGODB_URL: process.env.MONGODB_URL,
  PAGE_LIMIT: 6
}

module.exports = config
