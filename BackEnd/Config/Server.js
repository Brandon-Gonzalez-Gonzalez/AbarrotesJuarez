require('../Apis/Procedures');
require('../Apis/Updates');
require('../Apis/Views');
require('../Apis/Kpis');

const Host = require('./Host');
const port = 3000;

const path = require("path");

// Ruta absoluta al frontend
const frontPath = path.join(__dirname, "../FrontEnd");

// Servir archivos estáticos (HTML, CSS, JS)
Host.use(express.static(frontPath));

// Cualquier ruta que no sea API devolverá index.html
Host.get("*", (req, res) => {
  res.sendFile(path.join(frontPath, "index.html"));
});


Host.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
