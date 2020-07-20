const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const pg = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Lamonchotaovao1",
    database: "japlearn",
  },
});

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
  res.json("Home Page");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  pg("login")
    .select("email")
    .where({
      email: email,
      hash: password,
    })
    .then((result) => {
      console.log(result);
      if (Object.keys(result).length !== 0) {
        res.json("Login Successful!");
        console.log("Login Successful!");
      } else {
        res.status(400).json("Error Loggin in");
      }
    })
    .catch((error) => console.log(error));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  pg("users")
    .insert({
      name: name,
      email: email,
      joined: new Date(),
    })
    .then((result) => {
      res.json("registration success");
      console.log("result", result);
    })
    .catch((error) => {
      // res.status(400).json("Error in registration for users", error);
      console.log("error1", error);
    });

  pg("login")
    .insert({
      email: email,
      hash: password,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log("error2", err));
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
  console.log("server is running on port 3001");
});

/*
/ --> res = this is working
/signin --> POST user info in json format, res with success of fail
/register --> POST, add user data to database, res with user
/profile/:userId --> GET = user
*/
