// Importing required librairies
//const is used to declare a variable and require for importing librairies.
// imorting express and assigning it to constant variable express.
const express  = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const connectDB = require("./db") // Import MongoDB connection
const todoRoutes = require("./routes/todoRoutes")
dotenv.config()
const { register, httpRequestDurationSeconds } = require("./utils/metrics")

// Setup server to handle cross-origin requests and parse incoming JSON data.
const app = express();// create an express app. Calling express() returns an app object. This object is the foundation upon which you build your server-side application.
app.use(cors())// enabling CORS for cross-origin requests
app.use(bodyParser.json())//telling to use bodyParser
app.use(express.json())//handle Json data.

app.use('/', todoRoutes); // then your endpoint is GET /get-todo
//Starting server
connectDB();
app.get('/metrics', async(req,res) =>{
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
})

module.exports = app;