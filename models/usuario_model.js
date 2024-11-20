const db = require('../config/bd_conection');
const bcrypt = require('bcrypt');


const Usuario = {

    create: async (apellido, nombre, email, usuario, pass) => {
        const hashedPass = await bcrypt.hash(pass, 10); 

        try {
            const params = [apellido, nombre, email, usuario, hashedPass];
            const consulta = 'INSERT INTO USUARIO (apellido, nombre, email, usuario, pass) VALUES (?, ?, ?, ?, ?)';
            const result = await db.execute(consulta, params);
            return { message: `Usuario ${email} creado con exito`, detail: result };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Existe un usuario con los mismos datos: ' + error.message);
            } else if (error.code === 'ER_BAD_NULL_ERROR') {
                throw new Error('La columna no puede ser nula: ' + error.message);
            } else if (error.code === 'ER_NO_REFERENCED_ROW') {
                throw new Error(' Falla en la restricción de clave externa.: ' + error.message);
            } else {
                throw new Error('No se pudo registrar al usuario debido a: ' + error.message);
            }
        }
    },

    findAll: async () => {
        const query = 'SELECT * FROM usuario';
        try {
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    },


    findByMail: async (email) => {
        try {
            const consulta = `SELECT * FROM USUARIO WHERE email = ?`;
            const [result] = await db.execute(consulta, [email]);
            if (result.length == 0) {
                throw new Error(`Usuario no encontrado con el email : ${email}`);
            }
            return result; 
        } catch (error) {
            throw new Error(error.message);
        }
    },


    findById: async (id) => {
        const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
        try {
            const [rows] = await db.execute(query, [id]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el usuario: ' + error.message);
        }
    },

    update: async (id, email, pass) => {
        const hashedPass = await bcrypt.hash(pass, 10);
        const query = 'UPDATE USUARIO SET email = ?, pass = ?, WHERE id_usuario = ?';
        try {
            await db.execute(query, [email, hashedPass, id]);
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    },

    delete: async (id) => {
        const query = 'DELETE FROM USUARIO WHERE id_usuario = ?';
        try {
            await db.execute(query, [id]);
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
};

module.exports = Usuario;

