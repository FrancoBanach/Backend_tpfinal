const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const usuarioBD = require("../models/usuario_model.js");


// --rutas de escucha (endpoint) dispoibles para USUARIO --- 

app.get("/listartodo", listarTodoUsuario);
app.get("/listarusuario", listarPorUsuario);
app.post('/crear', crearUsuario);
app.put("/modificar", modificarUsuario);
app.delete("/eliminar", eliminarUsuario);


// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------

function listarTodoUsuario(req, res) {
    usuarioBD.metodos.consultarTodos((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function listarPorUsuario(req, res) {
    const usuario = req.params.usuario;
    usuarioBD.metodos.consultarPorUsuario(usuario, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(result);
            }
        });
}

function crearUsuario(req, res) {
    usuarioBD.metodos.crearUsuario(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function modificarUsuario(req, res) {
    const datosUsuario = req.body;
    const usuario = req.params.usuario;
    usuarioBD.metodos.update(datosUsuario, usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result); 
        }
    });
}

function eliminarUsuario(req, res) {
    const usuario = req.params.usuario
    usuarioBD.metodos.eliminarUsuario(usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports = app;

