const crypto = require("crypto");
const fs = require("fs");
const decrypt = require("./decrypt");
const receivedData = require("./signMessage").packageOfDataToSend; // this is the data we received from the sender

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");

const hash = crypto.createHash(receivedData.algorithm);

const decryptedMessage = decrypt.decryptWithPublickey(
  publicKey,
  receivedData.signedAndEncryptedData
);

const decryptedMessageHex = decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));

const hashOfOriginalHex = hash.digest("hex");

if (hashOfOriginalHex === decryptedMessageHex) {
  console.log(
    "Success! The data has not been tampered with and the sender is valid"
  );
} else {
  console.log(
    "Uh oh... Someone is trying to manipulate the data or someone else is manipulated it"
  );
}
