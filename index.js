const express = require("express");
<<<<<<< HEAD
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
=======

const data = require("./data/db");

const server = express();

server.use(express.json());

server.listen(5000, () => {
    console.log("*** Server Running on http://localhost:5000 ***");
  });
  
>>>>>>> fcca8468f777229e6afc1a20c22140395cea8f80
