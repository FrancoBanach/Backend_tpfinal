const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pacienteBD = require("../models/paciente_model.js");


// --rutas de escucha (endpoint) dispoibles para USUARIO --- 

app.get("/listartodo", listarTodoPaciente);
app.get("/listardni", listarPorPacienteDni);
app.get("/listarapellidonombre", listarPorPacienteApeNom);
app.post('/crear', crearPaciente);
app.put("/modificar", modificarPaciente);
app.delete("/eliminar", eliminarPaciente);


// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------

function listarTodoPaciente(req, res) {
    pacienteBD.metodos.consultarTodos((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function listarPorPacienteDni(req, res) {
    const dniPaciente = req.query.dni;
    pacienteBD.metodos.consultarPorDniPaciente(dniPaciente, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(result);
            }
        });
}

function listarPorPacienteApeNom(req, res) {
    const apellido = req.query.apellido;
    const nombre = req.query.nombre;
    pacienteBD.metodos.consultarPorApellidoNombre(apellido, nombre, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result); 
        }
    });
}

function crearPaciente(req, res) {
    pacienteBD.metodos.crearPaciente(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function modificarPaciente(req, res) {
    const datosPaciente = req.body;
    const dnipaciente = req.query.dni;
    pacienteBD.metodos.update(datosPaciente, dnipaciente, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result); 
        }
    });
}

function eliminarPaciente(req, res) {
    const dnipaciente = req.query.dni;
    pacienteBD.metodos.eliminarUsuario(dnipaciente, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports = app;