const crypto = require('crypto');
const config = require('../config/config.json');

const { key } = config.crypto;
const { algo } = config.crypto;
const ivLength = 16;

module.exports = {
  encrypt: (value) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algo, new Buffer.from(key), iv);
    let encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
  },
  decrypt: (value) => {
    const brokenValue = value.split('.');
    const iv = new Buffer.from(brokenValue.shift(), 'hex');
    const encryptedValue = new Buffer.from(brokenValue.join('.'), 'hex');
    const decipher = crypto.createDecipheriv(algo, new Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedValue);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  },
  getRandomBytes: length => crypto.randomBytes(length).toString('hex'),
  getRandomId: () => crypto.randomBytes(8).toString('hex') + Date.now() + crypto.randomBytes(8).toString('hex')
};
