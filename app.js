const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


//middleware
app.use(express.json());

const port=3000;

//routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)




//app.get("/api/v1/tasks") - get all the tasks
//app.get("/api/v1/tasks/:id") - get a single task
//app.post("/api/v1/tasks") - create a new task
//app.patch("/api/v1/tasks/:id") - update task
//app.delete("/api/v1/tasks/:id") - delete task


app.get("/", (req, res) => {
    res.send("Task manager app")
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("connected to DB")
        app.listen(3000, () => {
            console.log(`server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()