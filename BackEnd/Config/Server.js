require('../Apis/Procedures');
require('../Apis/Updates');
require('../Apis/Views');
require('../Apis/Kpis');

const Host = require('./Host');
const port = 3000;

Host.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
