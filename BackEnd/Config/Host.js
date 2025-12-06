const express = require("express");
const cors = require("cors");
const path = require("path");

const Host = express();

// Middlewares
Host.use(cors());
Host.use(express.json());

// Servir FrontEnd
const frontPath = path.join(__dirname, "../../FrontEnd");

// Archivos estáticos (CSS, JS, imágenes)
Host.use(express.static(frontPath));

// Rutas que no coincidan con API → index.html
Host.get("/*", (req, res) => {
  res.sendFile(path.join(frontPath, "index.html"));
});

module.exports = Host;
