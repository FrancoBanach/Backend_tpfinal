require('rootpath')();
const { query } = require('express');
const connection = require("../config/bd_conection.js");

var metodos = {}

metodos.consultarTodos = function (callback) {
    const consulta = "SELECT * FROM USUARIO"; 
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

metodos.consultarPorUsuario = function (usuario, callback) {
    const consulta = "SELECT * FROM USUARIO WHERE usuario LIKE ?";
    const usuarioBusqueda = `%${usuario}%`;
    connection.query(consulta, [usuarioBusqueda], function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "No se encontro un usuario con nombre: " + usuario);
            } else {
                callback(undefined, {
                    message: "Resultados de la consulta con el usuario " + usuario,
                    detail: resultados,
                });
            }
        }
    });
}

metodos.crearUsuario = function (datosUsuario, callback) {
   const usuario = [
        datosUsuario.apellido,
        datosUsuario.nombre,
        datosUsuario.email,
        datosUsuario.usuario,
        datosUsuario.pass,
    ];
   const consulta =
        "INSERT INTO USUARIO(apellido, nombre, email, usuario, pass) VALUES (?, ?, ?, ?, ?)";

    connection.query(consulta, usuario, (err, rows) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                callback({
                    message: "Ya existe un usuario " + datosUsuario.usuario,
                    detail: err.sqlMessage
                })
            } else {
                callback({
                    message: "Error desconocido",
                    detail: err.sqlMessage
                });
            };

        } else {
                callback(undefined, {
                message: "El usuario " + datosUsuario.usuario + " se registro correctamente",
                detail: rows,
                });
            }
    });
}

metodos.update = function (datosUsuario, usuario, callback) {

    datos = [
        datosUsuario.email,
        datosUsuario.pass,
        usuario
    ];
    consulta = "UPDATE USUARIO SET email = ?, pass = ? WHERE usuario = ?";

    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `No se encontro un usuario ${usuario}`,
                    detail: rows,
                })
            } else {
                callback(undefined, {
                    message:
                        `El usuario ${usuario} se actualizo correctamente`,
                    detail: rows,
                });
            }

        }
    });
}

metodos.eliminarUsuario = function (id_usuario, callback) {
    query = "DELETE FROM USUARIO WHERE id_usuario = ?";
    connection.query(query, id_usuario, function (err, rows, fields) {
        if (err) {
            callback({
                message: "Ha ocurrido un error",
                detail: err,
            });
        };

        //affectedRows muestra la cantidad de filas afectadas
        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un usuario con el id " + id_usuario);
        } else {
            callback(undefined, "El usuario " + id_usuario + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }
