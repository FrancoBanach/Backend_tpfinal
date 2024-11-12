const express = require('express');
const app = express();
const config = require("./config/config.json");
const morgan = require("morgan");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");


app.use("/api/medico", require("./controllers/medico_controller"));
app.use("/api/paciente", require("./controllers/paciente_controller"));
app.use("/api/ingreso", require("./controllers/ingreso_controller"));
app.use("/api/usuario", require("./controllers/usuario_controller"));
app.use((req, res) => {
    res.status(404).send("Error ruta Incorrecta");
});

app.listen(config.server.port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sevidor encendido y escuchando en el puerto " + config.server.port);
    }
  });