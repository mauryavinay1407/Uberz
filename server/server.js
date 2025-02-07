const app = require("./app");
const http = require("http");
require("dotenv").config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
