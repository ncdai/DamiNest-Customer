const shipping = (req, res) => {
  res.render('checkout/shipping')
}

const payment = (req, res) => {
  res.render('checkout/payment')
}

const success = (req, res) => {
  res.render('checkout/success')
}

module.exports = {
  shipping,
  payment,
  success
}
