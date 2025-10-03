require('../Apis/Procedures');
require('../Apis/Views');
require('../Apis/Kpis');
require('../Apis/Graficas');

const Host = require('./Host');
const port = 3000;

Host.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
