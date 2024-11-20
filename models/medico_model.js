const db = require('../config/bd_conection');


const Medico = {

    create: async (matricula, especialidad, apellido, nombre, telefono, direccion) => {
        const query =  "INSERT INTO MEDICO(matricula, especialidad, apellido, nombre, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            await db.execute(query, [matricula, especialidad, apellido, nombre, telefono, direccion]);
        } catch (error) {
            throw new Error('Error al crear el medico: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM MEDICO';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los medico: ' + error.message);
        }
    },

    findByMatricula: async (matricula) => {
        const query = 'SELECT * FROM MEDICO WHERE matricula = ?';
        try {
            const [rows] = await db.execute(query, [matricula]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar al medico por la Matricula: ' + error.message);
        }
    },

    update: async (apellido, nombre, telefono, direccion, matricula) => {
        const query = "UPDATE MEDICO SET apellido = ?, nombre = ?, telefono = ?, direccion = ? WHERE matricula = ?";
        try {
            const result = await db.execute(query, [apellido, nombre, telefono, direccion, matricula]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro un medico con la Matricula: ${matricula}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Medico actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar al medico: ' + error.message);
        }
    },

    delete: async (matricula) => {
        try {
            const query = 'DELETE FROM MEDICO WHERE matricula = ?';
            const result = await db.execute(query, [matricula]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro un medico con la Matricula: ${matricula}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Medico eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar el medico: ' + error.message);
        }
    }
};

module.exports = Medico;
