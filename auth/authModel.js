const db = require("../database/dbConfig");

module.exports = {
  add,
  // find,
  findBy
  // findById,
};

function add(user) {
  return db("users").insert(user);
}

function findBy(username) {
  return db("users")
    .where({ username })
    .first();
}
