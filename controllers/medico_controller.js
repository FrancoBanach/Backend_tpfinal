const express = require('express');
const router = express.Router();
const model = require("../models/medico_model.js");

// --rutas de escucha (endpoint) dispoibles para USUARIO --- 

router.get('/', listar_medico);
router.get('/:matricula', buscarPorMatricula);
router.post('/', crear_medico);
router.put('/:matricula', actualizar_medico);
router.delete('/:matricula', eliminar_medico);

// Funciones CRUD

async function listar_medico(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function buscarPorMatricula(req, res) {
    const { matricula } = req.params;
    try {
        const results = await model.findByMatricula(matricula);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Medico no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function crear_medico(req, res) {
    const { matricula, especialidad, apellido, nombre, telefono, direccion } = req.body;
    try {
        await model.create(matricula, especialidad, apellido, nombre, telefono, direccion);
        res.status(201).json({ message: 'Medico creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_medico(req, res) {
    const { matricula } = req.params;
    const { apellido, nombre, telefono, direccion } = req.body;
    try {
        await model.update(apellido, nombre, telefono, direccion, matricula);
        res.status(200).json({ message: 'Medico actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_medico(req, res) {
    const { matricula } = req.params;
    try {
        await model.delete(matricula);
        res.status(200).json({ message: 'Medico eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = router;

