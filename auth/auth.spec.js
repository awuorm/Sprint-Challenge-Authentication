const authRouter = require("./auth-router");
const request = require("supertest");
const db = require("../database/dbConfig");
const authModel = require("./authModel");
const server = require("../api/server");

beforeEach(async () => {
  await db("users").truncate();
});

describe("testing authRouter", () => {
  describe("testing register endpoint", () => {
    test("user can be registered", async () => {
      await authModel.add({ username: "mildredaa", password: "1234" });
      const user = await db("users");
      expect(user).toHaveLength(1);
    });
    test("returns 201 created status", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "mildreda", password: "1234" });
      expect(response.status).toBe(201);
    });
    describe("testing login endpoint", () => {
      test("user can login", async () => {
        const response = await request(server)
          .post("/api/auth/register")
          .send({ username: "mildreda", password: "1234" });
        const response2 = await request(server)
          .post("/api/auth/login")
          .send({ username: "mildreda", password: "1234" });
        expect(response2.status).toBe(200);
      });
      test("user can't login with wrong password", async () => {
        const response = await request(server)
          .post("/api/auth/register")
          .send({ username: "mildreda", password: "1234" });
        const response2 = await request(server)
          .post("/api/auth/login")
          .send({ username: "mildreda", password: "12345" });
        expect(response2.status).toBe(403);
      });
    });
  });
});
