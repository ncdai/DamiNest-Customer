const path = require('path')
const ejs = require('ejs-promise')
const trans = require('../views/email/locales')

const config = require('../config')
const dayjs = require('dayjs')
const currencyFormatter = require('./currency')

const mailgun = require('mailgun-js')({
  apiKey: config.MAILGUN_API_KEY,
  domain: config.MAILGUN_DOMAIN
})

const ejsDateFormatter = (date) => {
  return dayjs(date).format('H:mm:ss DD/MM/YYYY')
}

const htmlGenerator = async ({
  template,
  // Ngôn ngữ của template
  language = 'vi',
  // Tự động thêm hậu tố ngôn ngữ vào file template
  // VD : template = "order/to-admin" ; language = "vi"
  // => Render File : "PATH/order/to-admin.vi.ejs"
  useLanguageSuffix = false,
  params
}) => {
  let file
  if (useLanguageSuffix) {
    file = path.join(__dirname, `../views/email/${template}.${language}.ejs`)
  } else {
    file = path.join(__dirname, `../views/email/${template}.ejs`)
  }

  if (!file) {
    throw new Error(`Could not find the ${template} in path ${file}`)
  }

  const defaultParams = {
    currencyFormatter: currencyFormatter.format,
    dateFormatter: ejsDateFormatter,
    language,
    trans: trans(language),
    SUPPORT_EMAIL: config.SUPPORT_EMAIL,
    SUPPORT_PHONE_NUMBER: config.SUPPORT_PHONE_NUMBER,
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

const sendMail = ({ from = 'DamiNest Support', to, title, description, html }) => {
  const data = {
    from: `${from} <daminest@mg.penphy.com>`,
    to,
    subject: title,
    text: description,
    html
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

module.exports = {
  htmlGenerator,
  sendMail
}
