const request = require("supertest")
const {MongoMemoryServer} = require("mongodb-memory-server")
const mongoose = require("mongoose")

const app = require("../../server")
const Todo = require("../../models/todoModel")

describe("Todo Integeration test", () =>{
    let monogoServer;

    beforeAll(async ()=>{
        monogoServer = await MongoMemoryServer.create();
        const mongoUrl = monogoServer.getUri();
        console.log("Mongo server url is", mongoUrl)
        await mongoose.disconnect()
        await mongoose.connect(mongoUrl)
    })

    afterAll(async () =>{
        await mongoose.disconnect();
        await monogoServer.stop()
    })

    describe("GET /get-todo", ()=>{
        it("should return all the todos", async () =>{
            
            await Todo.create({title: "Todo 1"})
            await Todo.create({title: "Todo 2"})

            const response = await request(app).get("/get-todo");
            console.log("Response from the /get-todo test", response.body)
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(2)
            expect(response.body[0].title).toBe("Todo 1")
            expect(response.body[1].title).toBe("Todo 2")
        })
    })

    describe("POST /add-todo", ()=>{
        it("should create a new todo", async () =>{
            const response = await request(app).post("/add-todo").send({title: "New Todo"})

            expect(response.status).toBe(200);
            expect(response.body.title).toBe("New Todo");
            expect(response.body.completed).toBe(false);

            const todo = await Todo.findById(response.body._id)
            console.log("Response is ",todo);
            expect(todo).toBeTruthy();
            expect(todo.title).toBe("New Todo")
        })
    })
})