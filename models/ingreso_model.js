require('rootpath')();
const { query } = require('express');
const connection = require("../config/bd_conection.js");

var metodos = {}

metodos.consultarTodos = function (callback) {
    const consulta = "SELECT * FROM INGRESO"; 
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
    const consulta = "SELECT * FROM INGRESO WHERE dni = ?";
    const dni = parseInt(dniPaciente);
    connection.query(consulta, [dni], function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "No se encontro un ingreso con el paciente con DNI: " + dniPaciente);
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
    const consulta = "SELECT * FROM INGRESO WHERE apellido LIKE ? AND nombre LIKE ?";
    const valores = [`%${apellido}%`, `%${nombre}%`];
    connection.query(consulta, valores, function (err, resultados, fields) {
      if (err) {
        callback(err);
      } else {
        if (resultados.length == 0) {
          callback(undefined, "No se encontró un ingreso de paciente con el apellido y nombre proporcionados");
        } else {
          callback(undefined, {
            message: `Resultados de la consulta con apellido ${apellido} y nombre ${nombre}`,
            detail: resultados,
          });
        }
      }
    });
}

metodos.crearIngreso = function(datosIngreso, callback) {
    const ingreso = [
        datosIngreso.apellido,
        datosIngreso.nombre,
        parseInt(datosIngreso.dni),
        datosIngreso.fecha_ingreso,
        datosIngreso.diagnostico,
        parseInt(datosIngreso.id_paciente),
        parseInt(datosIngreso.id_medico)
    ];
    const consulta =
        "INSERT INTO INGRESO(apellido, nombre, dni, fecha_ingreso, diagnostico, id_paciente, id_medico) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(consulta, ingreso, (err, rows) => {
        if (err) {
            callback({
                message: "Error al registrar el ingreso",
                detail: err.sqlMessage
            });
        } else {
            callback(undefined, {
                message: "El ingreso de " + datosIngreso.apellido + " " + datosIngreso.nombre + " se registró correctamente",
                detail: rows
            });
        }
    });
}

metodos.update = function (datosPaciente, dnipaciente, callback) {

    const datos = [
        datosPaciente.diagnostico,
        dni = parseInt(dnipaciente),
        datosPaciente.fecha_ingreso
    ];
    const consulta = "UPDATE INGRESO SET diagnostico = ?, WHERE dni = ? AND fecha_ingreso = ?";
    
    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `No se encontro un paciente con con DNI ${dni} ingresado el ${datosPaciente.fecha_ingreso}`,
                    detail: rows,
                });
            } else {
                callback(undefined, {
                    message:
                        `El diagnostico del paciente con DNI ${dni} ingresado ${datosPaciente.fecha_ingreso} se actualizo correctamente`,
                    detail: rows,
                });
            }
        }
    });
}

metodos.eliminarIngreso = function (dnipaciente, f_ingreso, callback) {
    const dni = parseInt(dnipaciente);
    const fecha_ingreso = f_ingreso;
    const consulta = "DELETE FROM INGRESO WHERE dni = ? AND fecha_ingreso = ?";
    connection.query(consulta, dni, fecha_ingreso, function (err, rows, fields) {
        if (err) {
            callback({
                message: "Ha ocurrido un error",
                detail: err,
            });
        }
        //affectedRows muestra la cantidad de filas afectadas
        if (rows.affectedRows == 0) {
            callback(undefined, `No se encontro un paciente con con DNI ${dni} ingresado el ${fecha_ingreso}`);
        } else {
            callback(undefined, `El paciente con DNI ${dni} ingresado el ${fecha_ingreso} fue eliminado de la Base de datos`);
        }
    });
}

module.exports = { metodos }
