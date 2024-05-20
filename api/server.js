require("dotenv").config()
const Connection = require("./config/db")
const express = require("express")
const app = express()
const PORT = 8000 ||  process.env.PORT
Connection()
app.listen(PORT,()=>{
    console.log(`This port is running in ${PORT}`)
})