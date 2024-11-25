const db = require('../config/bd_conection');


const Paciente = {

    create: async (nhcl, nss, edad, sexo, dni, apellido, nombre, telefono, direccion) => {
        const query =  "INSERT INTO PACIENTE(nhcl, nss, edad, sexo, dni, apellido, nombre, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            await db.execute(query, [nhcl, nss, edad, sexo, dni, apellido, nombre, telefono, direccion]);
        } catch (error) {
            throw new Error('Error al crear la paciente: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM PACIENTE';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las paciente: ' + error.message);
        }
    },

    findByDni: async (dni) => {
        const query = 'SELECT * FROM PACIENTE WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar la paciente por DNI: ' + error.message);
        }
    },

    update: async (apellido, nombre, telefono, direccion, dni) => {
        const query = "UPDATE PACIENTE SET apellido = ?, nombre = ?, telefono = ?, direccion = ? WHERE dni = ?";
        try {
            const result = await db.execute(query, [apellido, nombre, telefono, direccion, dni]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro un paciente con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Paciente actualizado con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el paciente: ' + error.message);
        }
    },

    delete: async (dni) => {
        try {
            const query = 'DELETE FROM PACIENTE WHERE dni = ?';
            const result = await db.execute(query, [dni]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una paciente con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Paciente eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar la paciente: ' + error.message);
        }
    }
};

module.exports = Paciente;

