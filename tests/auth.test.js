import request from "supertest";
import app from "../app.js"
import { connectTestDB, closeTestDB } from "./setup.js";

beforeAll(async() =>{
    await connectTestDB();
});

afterAll(async() => {
    await closeTestDB();
});

describe("Auth Flow", () => {
    it("register a user", async() => {
        const res = await request(app)
            .post("/register")
            .send({
                username: "testuser",
                password: "password123"
            });

        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe("/login");
    });

    it("logs in a user", async() => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "testuser",
                password: "password123"
            });

        expect(res.statusCode).toBe(302);
        expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("rejects invalid login", async() => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "testuser",
                password: "password1234"
            });

        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe("/login");
    });
});