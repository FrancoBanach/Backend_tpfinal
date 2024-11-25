const db = require('../config/bd_conection');


const Turno = {

    create: async (apellido, nombre, dni, fecha_turno, medico) => {
        const query =  "INSERT INTO TURNO(apellido, nombre, dni, fecha_turno, medico) VALUES (?, ?, ?, ?, ?)";
        try {
            await db.execute(query, [apellido, nombre, dni, fecha_turno, medico]);
        } catch (error) {
            throw new Error('Error al crear el turno: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM TURNO';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener el turno: ' + error.message);
        }
    },

    findByDni: async (dni) => {
        const query = 'SELECT * FROM TURNO WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el turno por DNI: ' + error.message);
        }
    },

    update: async (apellido, nombre, dni, fecha_turno, medico, id_dni, id_fecha_turno) => {
        const query = "UPDATE TURNO SET apellido = ?, nombre = ?, dni = ?, fecha_turno = ? medico = ? WHERE id_dni = ? AND id_fecha_turno = ?";
        try {
            const result = await db.execute(query, [apellido, nombre, dni, fecha_turno, medico, id_dni, id_fecha_turno]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro un turno con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Turno actualizado con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el turno: ' + error.message);
        }
    },

    delete: async (dni) => {
        try {
            const query = 'DELETE FROM TURNO WHERE dni = ?';
            const result = await db.execute(query, [dni]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro un turno con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Turno eliminado con exito", detail: result }
        } catch (error) {
            throw new Error('Error al eliminar la turno: ' + error.message);
        }
    }
};

module.exports = Turno;

