const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
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
    password: "pgpassword",
    database: "japlearn",
  },
});

app.get("/", (req, res) => {
  res.json("Home Page");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  pg("login")
    .select("hash")
    .where({
      email: email,
    })
    .then((result) => {
      if (Object.keys(result).length !== 0) {
        if (bcrypt.compareSync(password, result[0].hash)) {
          pg("users")
            .select()
            .where({
              email: email,
            })
            .then((users) => {
              res.json(users[0]);
            });
        } else {
          res.json("incorrect password");
        }
      } else {
        res.status(400).json("email is not yet registered");
      }
    })
    .catch((error) => console.log(error));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  if (!name || !email || !password) {
    return res.status(400).json("empty name OR email OR password");
  }
  pg.transaction((trx) => {
    trx("login")
      .insert({
        email: email,
        hash: hash,
      })
      .then(() => {
        return trx("users")
          .insert({
            name: name,
            email: email,
            joined: new Date(),
          })
          .returning("*")
          .then((newUser) => {
            res.json(newUser[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then(function (result) {
      console.log("transaction result", result);
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
});

app.get("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  pg("users")
    .select()
    .where("id", userId)
    .then((user) => {
      if (user.length === 0) {
        res.json("user not found");
      } else {
        res.json(user[0]);
      }
    })
    .catch((error) => json.status(400).json("error getting user", error));
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
