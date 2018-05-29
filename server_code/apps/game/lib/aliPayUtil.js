const fs = require('fs');
const crypto = require('crypto');
const logger = require('ktoolkit').logger.output;

function createOrderId(userId) {
  const orderId = new Date().getTime() + userId + Math.ceil((Math.random() * 900) + 100);

  return orderId;
}

function getSign(prestr) {
  logger.info(prestr);
  const privatePem = fs.readFileSync('apps/game/config/rsa_private_key.pem');
  const privateKey = privatePem.toString();
  const sign = crypto.createSign('SHA256');
  sign.write(prestr);
  sign.end();

  return sign.sign(privateKey, 'base64');
}

module.exports = {
  createOrderId,
  getSign
};
