const express = require("express");
const app = express();
require("dotenv").config();
const {connectDB} = require("./db/db")
const cors = require("cors");
const userRoutes = require('./routes/user.routes')

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.json({Message:"Hello from server"});
})

app.use('/users',userRoutes);

module.exports = app;