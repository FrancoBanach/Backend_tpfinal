const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const medicoBD = require("../models/medico_model.js");


// --rutas de escucha (endpoint) dispoibles para MEDICO --- 

app.get("/listartodo", listarTodoMedico);
app.get("/listarespecialidad", obtenerMedicoEspecialidad);
app.get('/listarmatricula', obtenerMedicoMatricula);
app.post('/crear', crearMedico);
app.put("/modificar", modificarMedico);
app.delete("/eliminar", eliminarMedico);


// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------

function listarTodoMedico(req, res) {
    medicos = medicoBD.metodos.consultarTodos((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

function obtenerMedicoEspecialidad(req, res) {
    const especialidad = req.query.especialidad
    medicos = medicoBD.metodos.consultarPorEspecialidad(especialidad, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);//comparar con este el de abajo
        }
    });
};

function obtenerMedicoMatricula(req, res) {
    const matriculaMedico = req.query.matricula;
    medicoBD.metodos.consultarMatMedico(matriculaMedico, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

function crearMedico(req, res) {
    medicoBD.metodos.crearMedico(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

function modificarMedico(req, res) {
    const datosMedico = req.body;
    const matriculaMedico = req.query.matricula;
    medicoBD.metodos.update(datosMedico, matriculaMedico, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(result); 
        }
    });
};

function eliminarMedico(req, res) {
    const matriculaMedico = req.query.matricula;
    medicoBD.metodos.deleteMedico(matriculaMedico, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = app;