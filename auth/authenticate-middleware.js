/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "Mildred's secret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: err.message });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

module.exports = restricted;
