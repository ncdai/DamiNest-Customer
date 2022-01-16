const vi = require('./vi')
const _ = require('lodash')

const locales = {
  vi
}

const trans = language => (path, params = {}) => {
  const p = `${language}.${path}`

  if (_.has(locales, p)) {
    let text = _.get(locales, p)

    if (!_.isEmpty(params)) {
      const keys = _.keys(params)
      keys.forEach(key => {
        // Thay thế {{param}} bằng params[param]
        text = text.replace(`{{${key}}}`, params[key])
      })
    }

    return text
  }

  return p
}

module.exports = trans
