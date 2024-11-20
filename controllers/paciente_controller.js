const express = require('express');
const router = express.Router();
const model = require("../models/paciente_model.js");

// --rutas de escucha (endpoint) dispoibles

router.get('/', listar_paciente);
router.get('/:dni', buscarPorDni);
router.post('/', crear_paciente);
router.put('/:dni', actualizar_paciente);
router.delete('/:dni', eliminar_paciente);

// Funciones CRUD

async function listar_paciente(req, res) {
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
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function crear_paciente(req, res) {
    const { nhcl, nss, edad, sexo, dni, apellido, nombre, telefono, direccion } = req.body;
    try {
        await model.create(nhcl, nss, edad, sexo, dni, apellido, nombre, telefono, direccion);
        res.status(201).json({ message: 'Paciente creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_paciente(req, res) {
    const { dni } = req.params;
    const { apellido, nombre, telefono, direccion } = req.body;
    try {
        await model.update(apellido, nombre, telefono, direccion, dni);
        res.status(200).json({ message: 'Paciente actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_paciente(req, res) {
    const { dni } = req.params;
    try {
        await model.delete(dni);
        res.status(200).json({ message: 'Paciente eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = router;