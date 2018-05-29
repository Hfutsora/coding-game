/* eslint-disable camelcase */

const bizParams = {
  subject: '充值',
  out_trade_no: '',
  total_amount: 0,
  product_code: 'FAST_INSTANT_TRADE_PAY'
};

const params = {
  app_id: '2016091500519580',
  method: 'alipay.trade.page.pay',
  charset: 'utf-8',
  sign_type: 'RSA2',
  version: '1.0',
  return_url: 'http://localhost:8080/#/personalPage',
  notify_url: 'http://bio.measurex.top/v1/game/checkPay',
  biz_content: bizParams
  // 业务请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档
};

module.exports = {
  params
};
