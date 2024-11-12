require('rootpath')();
const { query } = require('express');
const connection = require("../config/bd_conection.js");

var metodos = {}

metodos.consultarTodos = function (callback) {
    const consulta = "SELECT * FROM MEDICO";
    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            callback(undefined, {
                message: "Resultados de la consulta",
                detail: resultados,
            });
        }
    });
}

metodos.consultarPorEspecialidad = function (especialidad, callback) {
    const consulta = "SELECT * FROM MEDICO WHERE especialidad = ?";
    connection.query(consulta, [especialidad], function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "No se encontro un medico con la especialidad: " + especiliadad);
            } else {
                callback(undefined, {
                    message: "Resultados de la consulta con la especialidad " + especiliadad,
                    detail: resultados,
                });
            }
        }
    });
}

metodos.consultarMatMedico = function (matriculaMedico, callback) {
    const matricula = parseInt(matriculaMedico);
    const consulta = "SELECT * FROM MEDICO WHERE matricula = ?";
    connection.query(consulta, [matricula], function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "No se encontro un medico con la matricula: " + matricula);
            } else {
                callback(undefined, {
                    message: "Resultados de la consulta con la matricula " + matricula,
                    detail: resultados,
                });
            }
        }
    });
}

metodos.crearMedico = function (datosMedico, callback) {
    const medico = [
        matricula = parseInt(datosMedico.matricula),
        datosMedico.especialidad,
        datosMedico.apellido,
        datosMedico.nombre,
        telefono = parseInt(datosMedico.telefono),
        datosMedico.direccion,
    ];
    const consulta =
        "INSERT INTO MEDICO (matricula, especialidad, apellido, nombre, telefono, direccion) VALUES (?, ?, ?, ?, ?, ? )";

    connection.query(consulta, medico, (err, rows) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                callback({
                    message: "Ya existe un medico con la matricula " + datosMedico.matricula,
                    detail: err.sqlMessage
                });
            } else {
                callback({
                    message: "Error desconocido",
                    detail: err.sqlMessage
                });
            }

        } else {
            callback(undefined, {
                message: "El medico " + datosMedico.nombre + " " + datosMedico.apellido + " se registro correctamente",
                detail: rows,
            });
        }
    });
}

metodos.update = function (datosMedico, matriculaMedico, callback) {

    const datos = [
        telefono = parseInt(datosMedico.telefono),
        datosMedico.direccion,
        matricula = parseInt(matriculaMedico)
    ];
    const consulta = "UPDATE MEDICO SET telefono = ?, direccion = ? WHERE matricula = ?";

    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `No se encontro un medico con la matricula ${matricula}`,
                    detail: rows,
                });
            } else {
                callback(undefined, {
                    message:
                        `El medico con matricula ${matricula} se actualizo correctamente`,
                    detail: rows,
                });
            }

        }
    });
}

metodos.deleteMedico = function (matriculaMedico, callback) {
    const matricula = parseInt(matriculaMedico);
    const consulta = "DELETE FROM MEDICO WHERE matricula = ?";
    connection.query(consulta, matricula, function (err, rows, fields) {
        if (err) {
            callback({
                message: "Ha ocurrido un error",
                detail: err,
            });
        }

        //affectedRows muestra la cantidad de filas afectadas
        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un medico con la matricula " + matricula);
        } else {
            callback(undefined, "El medico " + matricula + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }
