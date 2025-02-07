const express = require("express");
const app = express();

app.get('/',(req,res)=>{
    res.json({Message:"Hello from server"});
})


module.exports = app;