const config = require('../config')
const { OrderModel, ProductReviewModel } = require('../models')

const { mailUtil, currencyUtil } = require('../utils')
const trans = require('../views/email/locales')

const sendOrderEmail = async (req, res) => {
  const { orderId } = req.params
  const { status, secretKey } = req.query

  if (secretKey !== config.SECRET_KEY) {
    res.boom.unauthorized()
    return
  }

  const order = await OrderModel.findById(orderId).exec()

  if (!order) {
    res.boom.notFound('Đơn hàng không tồn tại')
    return
  }

  if (status === 'PENDING') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/pending',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('vi')('order.order.pending.title', { orderId: order._id }),
      description: trans('vi')('order.order.pending.description', { total: currencyUtil.format(order.total) }),
      html
    })
    res.send(html)
    return
  }

  if (status === 'PROCESSING') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/processing',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('vi')('order.order.processing.title', { orderId: order._id }),
      description: trans('vi')('order.order.processing.description'),
      html
    })
    res.send(html)
    return
  }

  if (status === 'TRANSFERRING') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/transferring',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('vi')('order.order.transferring.title', { orderId: order._id }),
      description: trans('vi')('order.order.transferring.description'),
      html
    })
    res.send(html)
    return
  }

  if (status === 'DONE') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/done',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('vi')('order.order.done.title', { orderId: order._id }),
      description: trans('vi')('order.order.done.description'),
      html
    })
    res.send(html)
    return
  }

  if (status === 'REJECTED') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/reject',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('vi')('order.order.reject.title', { orderId: order._id }),
      description: trans('vi')('order.order.reject.description', { reasons: order.reasonsForRejection }),
      html
    })
    res.send(html)
    return
  }

  res.json({
    message: 'Order Email Service by @iamncdai'
  })
}

const sendProductReviewEmail = async (req, res) => {
  const { reviewId } = req.params
  const { secretKey, to } = req.query

  if (secretKey !== config.SECRET_KEY) {
    res.boom.unauthorized()
    return
  }

  const review = await ProductReviewModel.findById(reviewId).exec()

  if (!review) {
    res.boom.notFound('Đánh giá không tồn tại')
    return
  }

  if (to === 'admin') {
    const html = await mailUtil.htmlGenerator({
      template: 'review/to-admin',
      params: {
        review
      }
    })
    await mailUtil.sendMail({
      to: config.ADMIN_EMAIL,
      title: `${review.fullName} vừa nhận xét sản phẩm ${review.productName}`,
      description: 'Vui lòng xem đánh giá và tiến hành kiểm duyệt.',
      html
    })
    res.send(html)
    return
  }

  if (to === 'owner') {
    const html = await mailUtil.htmlGenerator({
      template: 'review/to-owner',
      useLanguageSuffix: true,
      params: {
        review
      }
    })
    await mailUtil.sendMail({
      to: review.email,
      title: 'Nhận xét của bạn đã được đăng!',
      description: 'Nhận xét của bạn đã được đăng!',
      html
    })
    res.send(html)
    return
  }

  res.json({
    message: 'Review Email Service by @iamncdai'
  })
}

module.exports = {
  sendOrderEmail,
  sendProductReviewEmail
}
