require("dotenv").config()
const Connection = require("./config/db")
const express = require("express")
const app = express()
app.use(express.json());

const PORT = 8000 ||  process.env.PORT
Connection()
app.use("/api/user", require("./routes/user"))
app.use("/api/post", require("./routes/post"))
app.use("/api/comments", require("./routes/comments"))
app.listen(PORT,()=>{
    console.log(`This port is running in ${PORT}`)
})