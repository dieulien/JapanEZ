const handleRegister = (pg, bcrypt) => (req, res) => {
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
  }

  module.exports = {
    handleRegister: handleRegister
  };