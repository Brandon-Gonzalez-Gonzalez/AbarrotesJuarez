const express = require("express");
const cors = require("cors");
const Host = express();

Host.use(cors());
Host.use(express.json()); 

module.exports = Host; 
