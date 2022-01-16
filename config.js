const dotenv = require('dotenv')

dotenv.config()

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  PAGE_LIMIT: 6,

  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,

  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  SUPPORT_PHONE_NUMBER: process.env.SUPPORT_PHONE_NUMBER,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL
}

module.exports = config
