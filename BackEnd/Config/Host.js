const express = require("express");
const cors = require("cors");
const path = require("path");

const Host = express();

// Middlewares
Host.use(cors());
Host.use(express.json());

// Servir FrontEnd
const frontPath = path.join(__dirname, "../../FrontEnd");

// Archivos estáticos
Host.use(express.static(frontPath));

// Cualquier ruta que no sea API o archivo estático → index.html
Host.get("*", (req, res) => {
  res.sendFile(path.join(frontPath, "index.html"));
});

module.exports = Host;
