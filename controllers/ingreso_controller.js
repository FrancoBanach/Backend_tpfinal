const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const ingresoBD = require("../models/ingreso_model.js");


// --rutas de escucha (endpoint) dispoibles para USUARIO --- 

app.get("/listartodo", listarTodoIngreso);
app.get("/listardni", listarIngresoPacienteDni);
app.get("/listarapellidonombre", listarIngresoPacienteApeNom);
app.post('/crear', crearIngreso);
app.put("/modificar", modificarIngreso);
app.delete("/eliminar", eliminarIngreso);


// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------

function listarTodoIngreso(req, res) {
    ingresoBD.metodos.consultarTodos((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function listarIngresoPacienteDni(req, res) {
    const dniPaciente = req.query.dni;
    ingresoBD.metodos.consultarPorDniPaciente(dniPaciente, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(result);
            }
        });
}

function listarIngresoPacienteApeNom(req, res) {
    const apellido = req.query.apellido;
    const nombre = req.query.nombre;
    ingresoBD.metodos.consultarPorApellidoNombre(apellido, nombre, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result); 
        }
    });
}

function crearIngreso(req, res) {
    ingresoBD.metodos.crearIngreso(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function modificarIngreso(req, res) {
    const datosPaciente = req.body;
    const dnipaciente = req.query.dni;
    ingresoBD.metodos.update(datosPaciente, dnipaciente, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result); 
        }
    });
}

function eliminarIngreso(req, res) {
    const dnipaciente = req.query.dni;
    const f_ingreso = req.query.fecha_ingreso;
    ingresoBD.metodos.eliminarIngreso(dnipaciente, f_ingreso, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports = app;