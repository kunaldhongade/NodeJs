const express = require("express");
const cookieParser = require("cookie-parser");
const { laptops, mobiles, users } = require("./data/data");

const app = express();
app.use(cookieParser("abcdef-123"));
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.json("goto /mobiles for mobile and /laptops for laptop");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/mobiles", (req, res) => {
  try {
    let userdata = req.signedCookies.userdata;
    console.log(`userdata: ${JSON.stringify(userdata)}`);

    if (!userdata) {
      userdata = { user: "Guest", pages: [] };
    }
    userdata.pages.push({ url: "/mobiles", date: Date.now() });

    res.cookie("userdata", userdata, { maxAge: 3000000, signed: true });
    res.status(200).send(mobiles);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/laptops", (req, res) => {
  try {
    let userdata = req.signedCookies.userdata;
    console.log(`userdata: ${JSON.stringify(userdata)}`);

    if (!userdata) {
      userdata = { user: "Guest", pages: [] };
    }

    userdata.pages.push({ url: "/laptops", date: Date.now() });
    res.cookie("userdata", userdata, { maxAge: 3000000, signed: true });
    res.status(200).send(laptops);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", (req, res) => {
  try {
    let { name, password } = req.body;
    let user = users.find(
      (user) => user.name === name && user.password === password
    );
    if (user) {
      res.cookie(
        "userdata",
        { user: name, pages: [] },
        { maxAge: 3000000, signed: true }
      );
      res.status(200).send(`Welcome ${user.name} your role is : ${user.role}`);
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("userdata");
    res.status(200).send("Logout successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/cookieData", (req, res) => {
  try {
    let userdata = req.signedCookies.userdata;
    res.status(200).json(userdata);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/users", (req, res) => {
  try {
    let userdata = req.signedCookies.userdata;
    console.log(userdata);
    let { user } = userdata;
    console.log(user);

    if (!userdata || user === "Guest") {
      res.status(401).json("Unauthorized access, login first");
      return;
    }

    const u1 = users.find((u) => u.name === user);
    console.log(users);

    if (!u1.role === "admin") {
      res.status(401).send("Unauthorized access, admin access only");
    }

    let names = users.map((u) => u.name);
    console.log(names);
    res.status(200).send(names);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(5000, () => {
  console.log(`server is started at 3001`);
});
