const path = require('path')
const ejs = require('ejs-promise')

const config = require('../config')

const mailgun = require('mailgun-js')({
  apiKey: config.MAILGUN_API_KEY,
  domain: config.MAILGUN_DOMAIN
})

const sendMail = ({ from = 'DamiNest Support', to, subject, content }) => {
  const data = {
    from: `${from} <daminest@mg.penphy.com>`,
    to,
    subject,
    html: content
  }
  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (error, body) => {
      const errorData = {
        message: error
      }
      if (error) reject(errorData)
      else resolve(body)
    })
  })
}

const htmlGenerator = async ({
  template,
  params
}) => {
  const file = path.join(__dirname, `../views/email/${template}.ejs`)

  if (!file) {
    throw new Error(`Could not find the ${template} in path ${file}`)
  }

  const defaultParams = {
    ...params
  }

  const res = await ejs.renderFile(file, defaultParams, {}, (error, result) => {
    if (error) {
      return error
    }
    return result
      .then(function (data) {
        return data
      }).catch((error) => {
        throw error
      })
  })

  return res
}

module.exports = {
  sendMail,
  htmlGenerator
}
