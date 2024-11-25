const express = require('express');
const router = express.Router();
const model = require("../models/turno_model.js");

// --rutas de escucha (endpoint) dispoibles

router.get('/', listar_turno);
router.get('/:dni', buscarPorDni);
router.post('/', crear_turno);
router.put('/:dni', actualizar_turno);
router.delete('/:dni', eliminar_turno);

// Funciones CRUD

async function listar_turno(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function buscarPorDni(req, res) {
    const { dni } = req.params;
    try {
        const results = await model.findByDni(dni);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function crear_turno(req, res) {
    const { apellido, nombre, dni, fecha_turno, medico } = req.body;
    try {
        await model.create(apellido, nombre, dni, fecha_turno, medico);
        res.status(201).json({ message: 'Turno creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_turno(req, res) {
    const { id_dni, id_fecha_turno } = req.params;
    const {apellido, nombre, dni, fecha_turno, medico} = req.body;
    try {
        await model.update(apellido, nombre, dni, fecha_turno, medico, id_dni, id_fecha_turno);
        res.status(200).json({ message: 'Turno actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_turno(req, res) {
    const { dni } = req.params;
    try {
        await model.delete(dni);
        res.status(200).json({ message: 'Turno eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = router;