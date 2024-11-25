const express = require('express');
const app = express();
const config = require("./config/config.json");

const morgan = require('morgan')
app.use(morgan('common'));

var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/medico", require("./controllers/medico_controller"));
app.use("/api/paciente", require("./controllers/paciente_controller"));
app.use("/api/ingreso", require("./controllers/turno_controller"));
app.use("/api/usuario", require("./controllers/usuario_controller"));
app.use((req, res) => {
    res.status(404).send("Error ruta Incorrecta");
});


function startServer(puerto) {
  const server = app.listen(puerto, () => {
      console.log(`Servidor escuchando en: http://localhost:${puerto}`);
  });

  server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
          console.log(`Puerto ${puerto} en uso, intentando con el puerto ${puerto + 1}...`);
          puerto++;
          startServer(puerto); 
      } else {
          console.error("Error al iniciar el servidor:", err);
      }
  });
}


startServer(config.server.port);

module.exports = app;