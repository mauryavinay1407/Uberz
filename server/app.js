const express = require("express");
const app = express();
require("dotenv").config();
const {connectDB} = require("./db/db")

connectDB();

app.get('/',(req,res)=>{
    res.json({Message:"Hello from server"});
})


module.exports = app;