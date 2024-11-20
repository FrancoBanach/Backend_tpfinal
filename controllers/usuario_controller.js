const express = require('express');
const router = express.Router();
const model = require('../models/usuario_model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { rulesUser, validate } = require('../midlewares/validations.js');

// --rutas de escucha (endpoint) dispoibles

router.get('/', listar_usuarios);
router.get('/:id_usuario', buscarPorID);
router.post('/', rulesUser(), validate, crear_usuario);
router.put('/:id_usuario', actualizar_usuario);
router.delete('/:id_usuario', eliminar_usuario);
router.post('/login', login);


// Funciones CRUD

async function listar_usuarios(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorID(req, res) {
    const { usuario_id } = req.params;
    try {
        const result = await model.findById(usuario_id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function crear_usuario(req, res) {
    const { apellido, nombre, email, usuario, pass } = req.body;
    try {
        const result = await model.create(apellido, nombre, email, usuario, pass);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_usuario(req, res) {
    const { usuario_id } = req.params;
    const { mail, pass } = req.body;
    try {
        await model.update(usuario_id, mail, pass);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminar_usuario(req, res) {
    const { usuario_id } = req.params;
    try {
        await model.delete(usuario_id);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, pass } = req.body;
        const [result] = await model.findByMail(email);
        const iguales = bcrypt.compareSync(pass, result.pass);

        if (iguales) {
            let user = {
                nombre: result.nombre,
                apellido: result.apellido,
                email: result.email
            }
            jwt.sign(user, 'ultraMegaSecretPass', { expiresIn: '10000s' }, (err, token) => {
                if (err) {
                    res.status(500).send({ message: err });
                } else {
                    res.status(200).json({ datos: user, token: token });
                }
            })
        } else {
            res.status(403).send({ message: 'Contraseña Incorrecta' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


module.exports = router;
