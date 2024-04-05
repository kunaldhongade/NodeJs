const base64url = require("base64url");

const JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ";

console.log(JWT);

// const jwtParts = JWT.split(".");
// // console.log("kunal");
// // console.log(jwtParts);

// const headerInBase64UrlFormat = jwtParts[0];
// const payloadInBase64UrlFormat = jwtParts[1];
// const signatureInBase64UrlFormat = jwtParts[2];

// const decodedHeader = base64url.decode(headerInBase64UrlFormat);
// const decodedPayload = base64url.decode(payloadInBase64UrlFormat);
// const decodedSignature = base64url.decode(signatureInBase64UrlFormat); // its not decrypted

// console.log(decodedHeader);
// console.log(decodedPayload);
// console.log(decodedSignature);

const crypto = require("crypto");
const fs = require("fs");
const signatureFunction = crypto.createSign("RSA-SHA256");
const verifyFunction = crypto.createVerify("RSA-SHA256");

// Issue JWT

const headerObj = {
  alg: "RS256",
  typ: "JWT",
};

const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};

const headerObjString = JSON.stringify(headerObj); // turning obj into string json format
const payloadObjString = JSON.stringify(payloadObj);

// convert json format into base64
const base64urlHeader = base64url(headerObjString);
const base64urlPayload = base64url(payloadObjString);

signatureFunction.write(base64urlHeader + "." + base64urlPayload); // this going to hash signature using sha256 rsa
signatureFunction.end();

const PRIV_KEY = fs.readFileSync(__dirname + "/priv_key.pem", "utf8");
const signatureBase64 = signatureFunction.sign(PRIV_KEY, "base64");

const signatureBase64url = base64url.fromBase64(signatureBase64);

// Verification

const jwt = base64urlHeader + "." + base64urlPayload + "." + signatureBase64url;

verifyFunction.write(base64urlHeader + "." + base64urlPayload);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureBase64url);

const PUB_KEY = fs.readFileSync(__dirname + "/pub_key.pem", "utf8");

const signatureIsValid = verifyFunction.verify(
  PUB_KEY,
  jwtSignatureBase64,
  "base64"
);

console.log(signatureIsValid);
