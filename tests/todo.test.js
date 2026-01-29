import request from "supertest";
import app from "../app.js"
import { connectTestDB, closeTestDB } from "./setup.js";

let agent;
beforeAll(async() =>{
    await connectTestDB();
    agent = request.agent(app)

    await agent
        .post("/register")
        .send({ username: "todoUser", password: "password123"});

    await agent
        .post("/login")
        .send({ username: "todoUser", password: "password123"});
});

afterAll(async() => {
    await closeTestDB();
});


describe("Todo Routes", () => {
    it("adds a todo", async() => {
        const res = await agent
            .post("/add")
            .send({todo: "Write tests"});
        expect(res.statusCode).toBe(302);
    });

    it("fetches todos", async() => {
        const res = await agent.get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain("Write tests");
    });
})