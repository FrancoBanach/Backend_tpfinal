const mysql = require("mysql");
const configuracion = require("./config.json");

const BDconection = mysql.createConnection(configuracion.database);

BDconection.connect((err) => {
    if (err) {
        console.log(err.code);
    } else {
        console.log("BD conectada");
    }
});

module.exports = BDconection;