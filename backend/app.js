const express = require("express");
const cors = require("cors")

const route = require("./routes/todoroute")

const mongoose = require("mongoose")
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5052


app.use(express.json())
app.use(cors())

app.use("/todos/",route)


mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Database is Connected Successfully")
    app.listen(PORT,()=>{
        console.log(`server is runing on  http://localhost:${PORT}`)
    })
})
.catch(e=>{
    {
        console.log(`DB error : ${e.message}`)
    }
})