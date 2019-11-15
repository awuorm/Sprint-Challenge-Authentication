const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("./authModel");
const jwt = require("jsonwebtoken");

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
  const { username, password } = req.body;
  db.findBy(username).then(user => {
    console.log(user);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      console.log("secret",token);
      res
        .status(200)
        .json({ success: `Welcome ${user.username}`, token: token });
    } else {
      res.status(403).json({ forbidden: "Please provide a valid password" });
    }
  }).catch(err => {
    res.status(500).json({errorMessage: err.message});
    console.log(err);
  })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(payload,"Mildred's secret", options);

  return result;
}

module.exports = router;
