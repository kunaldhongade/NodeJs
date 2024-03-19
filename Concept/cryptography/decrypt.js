const crypto = require("crypto");

function decryptWithPrivatekey(privateKey, encryptedMessage) {
  return crypto.privateDecrypt(privateKey, encryptedMessage);
}

module.exports.decryptWithPrivatekey = decryptWithPrivatekey;
