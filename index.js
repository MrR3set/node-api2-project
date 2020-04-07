const express = require("express");

const data = require("./data/db");

const server = express();

server.use(express.json());

server.listen(5000, () => {
    console.log("*** Server Running on http://localhost:5000 ***");
  });
  