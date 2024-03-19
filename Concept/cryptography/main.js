const fs = require("fs");
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");
const message = "Super Secret Message";
// stores a buffer Object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, message);

console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");

const decryptedMessage = decrypt.decryptWithPrivatekey(
  privateKey,
  encryptedMessage
);

// convert the buffer to a string and print the message
console.log(decryptedMessage.toString());
