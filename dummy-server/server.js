const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "0",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      joined: new Date(),
    },
    {
      id: "1",
      name: "Becky",
      email: "becky@gmail.com",
      password: "cakes",
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (req.body.email === database.users[0].name) {
    res.send("Login Successful!");
    console.log(req.body);
  } else {
    res.status(400).json("Error Logging in :(");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const id = Number(database.users[database.users.length - 1].id) + 1;
  database.users.push({
    id: "223",
    name: name,
    email: email,
    password: password,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (userId == user.id) {
      found = true;
      res.json("User found!");
    }
  });
  if (!found) {
    res.status(404).json("User not found!");
  }
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});

/*
/ --> res = this is working
/signin --> POST user info in json format, res with success of fail
/register --> POST, add user data to database, res with user
/profile/:userId --> GET = user
*/
