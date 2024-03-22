const crypto = require("crypto");
const fs = require("fs");
const decrypt = require("./decrypt");
const receivedData = require("./signMessage").packageOfDataToSend; // this is the data we received from the sender

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

const hash = crypto.createHash(receivedData.algorithm);
