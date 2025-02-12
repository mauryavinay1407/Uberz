const express = require("express");
const app = express();
require("dotenv").config();
const {connectDB} = require("./db/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.json({Message:"Hello from server"});
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);

module.exports = app;