const express = require("express");
const cors = require("cors");
const postsRouter = require("./data/router.js");

const server = express();

server.use(cors());

server.use(express.json());

server.use("/api/posts", postsRouter)

server.get("/",(req,res)=>{
    res.send({api:"ok"});
})

server.listen(5000,()=>{
    console.log("server ok");
})