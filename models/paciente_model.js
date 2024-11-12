require('rootpath')();
const { query } = require('express');
const connection = require("../config/bd_conection.js");

var metodos = {}

metodos.consultarTodos = function (callback) {
    const consulta = "SELECT * FROM PACIENTE"; 
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

metodos.consultarPorDniPaciente = function (dniPaciente, callback) {
    const consulta = "SELECT * FROM PACIENTE WHERE dni = ?";
    const dni = parseInt(dniPaciente);
    connection.query(consulta, [dni], function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "No se encontro un paciente con DNI: " + dniPaciente);
            } else {
                callback(undefined, {
                    message: "Resultados de la consulta con el DNI " + dniPaciente,
                    detail: resultados,
                });
            }
        }
    });
}

metodos.consultarPorApellidoNombre = function (apellido, nombre, callback) {
    const consulta = "SELECT * FROM PACIENTE WHERE apellido LIKE ? AND nombre LIKE ?";
    const valores = [`%${apellido}%`, `%${nombre}%`];
    connection.query(consulta, valores, function (err, resultados, fields) {
      if (err) {
        callback(err);
      } else {
        if (resultados.length == 0) {
          callback(undefined, "No se encontró un paciente con el apellido y nombre proporcionados");
        } else {
          callback(undefined, {
            message: `Resultados de la consulta con apellido ${apellido} y nombre ${nombre}`,
            detail: resultados,
          });
        }
      }
    });
}

metodos.crearPaciente = function (datosPaciente, callback) {
   const paciente = [
        nhcl = parseInt(datosPaciente.nhcl),
        nss = parseInt(datosPaciente.nss),
        edad = parseInt(datosPaciente.edad),
        datosPaciente.sexo,
        dni = parseInt(datosPaciente.dni),
        datosPaciente.apellido,
        datosPaciente.nombre,
        telefono = parseInt(datosPaciente.telefono),
        datosPaciente.direccion,
    ];
   const consulta =
        "INSERT INTO PACIENTE(nhcl, nss, edad, sexo, dni, apellido, nombre, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(consulta, paciente, (err, rows) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                callback({
                    message: "Ya existe un paciente con DNI " + dni,
                    detail: err.sqlMessage
                })
            } else {
                callback({
                    message: "Error desconocido",
                    detail: err.sqlMessage
                });
            }

        } else {
                callback(undefined, {
                message: "El paciente " + datosPaciente.apellido + " " + datosPaciente.nombre + " se registro correctamente",
                detail: rows,
                });
            }
    });
}

metodos.update = function (datosPaciente, dnipaciente, callback) {

    const datos = [
        telefono = parseInt(datosPaciente.telefono),
        datosPaciente.direccion,
        dni = parseInt(dnipaciente)
    ];
    const consulta = "UPDATE PACIENTE SET telefono = ?, direccion = ? WHERE dni = ?";
    
    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `No se encontro un paciente con DNI ${dni}`,
                    detail: rows,
                });
            } else {
                callback(undefined, {
                    message:
                        `El paciente con DNI ${dni} se actualizo correctamente`,
                    detail: rows,
                });
            }
        }
    });
}

metodos.eliminarUsuario = function (dnipaciente, callback) {
    const dni = parseInt(dnipaciente);
    const consulta = "DELETE FROM PACIENTE WHERE dni = ?";
    connection.query(consulta, dni, function (err, rows, fields) {
        if (err) {
            callback({
                message: "Ha ocurrido un error",
                detail: err,
            });
        }

        //affectedRows muestra la cantidad de filas afectadas
        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un usuario con el DNI " + dni);
        } else {
            callback(undefined, "El paciente con DNI " + dni + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }
