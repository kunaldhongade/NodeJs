const fs = require("fs");
const encrypt = require("./encrypt");

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pen", "utf8");
const message = "Super Secret Message";
// stores a buffer Object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, message);

console.log(encryptedMessage.toString());
