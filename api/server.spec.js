const server = require("./server");
const request = require("supertest");


describe("testing server",() => {
    describe(" testing default get", () => {
        test("returns 200 ok", async () => {
             const response = await request(server).get("/");
            expect(response.body).toBe("Hello from jokes server!");
            expect(response.status).toBe(200);
        })
    })
})