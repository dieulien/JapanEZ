const displayPersonalizedContent = (pg) => (req, res) => {
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
  };

  export default displayPersonalizedContent;