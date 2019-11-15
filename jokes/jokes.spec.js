const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("testing jokes endpoint", () => {
  test("logged in user can get jokes", async () => {
    const response3 = await request(server).get("/api/jokes/");
    console.log(response3);
  });
});
