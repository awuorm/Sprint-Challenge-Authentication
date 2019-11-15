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
  const {username, password} = req.body;
  db.findBy(username).then(user => {
    if(user && bcrypt.compareSync(password,user.password)){
      res.status(200).json({success: `Welcome ${user.username}`});
    }
    else {
      res.status(403).json({forbidden: "Please provide a valid password"});
    }
    
  })
});

module.exports = router;
