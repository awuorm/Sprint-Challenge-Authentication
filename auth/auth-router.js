const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("./authModel");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  console.log(user);
  db.add(user)
    .then(user => {
      console.table(user);
      res.status(201).json({ created: "user successfully created" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
