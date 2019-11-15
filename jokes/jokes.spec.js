const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("testing jokes endpoint", () => {
  test("logged in user can get jokes", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "mildreda", password: "1234" });
    const response2 = await request(server)
      .post("/api/auth/login")
      .send({ username: "mildreda", password: "1234" });
    expect(response2.status).toBe(200);
    const token = response2.body.token;
    const response3 = await request(server)
      .get("/api/jokes/")
      .set("authorization", token);
    expect(response3.status).toBe(200);
  });
  test("user not logged in cannot get jokes", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "mildreda", password: "1234" });
    const response2 = await request(server)
      .post("/api/auth/login")
      .send({ username: "mildreda", password: "12345" });
    expect(response2.status).toBe(403);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Im1pbGRyZWRhIiwiaWF0IjoxNTczODEzNjk3LCJleHAiOjE1NzM5MDAwOTd9.Wj3e8RAYJ4WT7TgrdtzO72DVPjBjVgbJFDhN8HDvNmR";
    const response3 = await request(server)
      .get("/api/jokes/")
      .set("authorization", token);
    expect(response3.status).toBe(401);
  });
});
