const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Connecting database
mongoose.connect("mongodb://localhost:27017/mechanical",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Database connected"))
.catch(()=> console.log("DataBase connection Error"))

// Setting up port
const port = 1234

// Starting server
app.listen(port, ()=> {
    console.log(`Port ${port} is running`)
})