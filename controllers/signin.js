const handleSignIn = (pg, bcrypt) => (req, res) => {
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
  }

  export default handleSignIn;