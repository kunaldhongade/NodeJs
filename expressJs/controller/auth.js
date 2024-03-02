const { User } = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

const saltRounds = 10;
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    // let token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET); // jwt token will expire and anyone can decode it

    let token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
    });

    user.token = token;

    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    user.password = hash;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);

    if (!isAuth) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
    });
    doc.token = token;
    await doc.save();
    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
