const crypto = require("crypto");
const hash = crypto.createHash("sha256"); // this is a trapdoor function
const fs = require("fs");
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");

const myData = {
  firstName: "kunal",
  lastName: "dhongade",
  impId: "a123d332dddd33d",
};

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object: requires string format, so we must convert our
hash.update(myDataString);

// hashed data in hexadecimal format
const hashedData = hash.digest("hex");
// it is imp that we send the hashed data to the receiver so that they can verify the data

const senderPrivateKey = fs.readFileSync(
  __dirname + "/id_rsa_priv.pem",
  "utf8"
);

const signedMessage = encrypt.encryptWithPrivateKey(
  senderPrivateKey,
  hashedData
);

// To verify the user singed it really that user
/**
 *
 * If we just send signed message to someone we need to verify the person who said they singed it actually they signed it
 *
 * so we need to some data to verify our signed message
 * 1. which hash function we used
 * 2. original data
 * 3. public key of the sender.
 * 4. signed message
 */

const packageOfDataToSend = {
  algorithm: "sha256",
  originalData: myData,
  signedAndEncryptedData: signedMessage,
};

module.exports = packageOfDataToSend;
