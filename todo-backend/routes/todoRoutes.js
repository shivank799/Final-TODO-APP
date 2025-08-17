const express = require("express")
const {getTodos, addTodo} = require("../controllers/todocontroller")

const router = express.Router()
//Get route for fetching Todo items
router.get("/get-todo", getTodos)

//Post route for adding todo
router.post("/add-todo", addTodo)

module.exports = router;