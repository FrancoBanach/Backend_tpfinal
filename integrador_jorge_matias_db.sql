create database integrador;
use integrador;

CREATE TABLE USUARIO
(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    mail VARCHAR(50) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL
);

CREATE TABLE PACIENTE
(
  dni varchar(8) NOT NULL primary key,
  nombre varchar(40) NOT NULL,
  apellido varchar(40) NOT NULL,
  fecha_nacimiento date,
  telefono varchar(15)
  );

CREATE TABLE MEDICO
(
  medico_id int auto_increment primary key,
  matricula varchar(10) NOT NULL,
  nombre varchar(40) NOT NULL,
  apellido varchar(40) NOT NULL,
  especialidad varchar(30),
  telefono varchar(15)
);

CREATE TABLE INGRESO
(
  ingreso_id int auto_increment primary key,
  fecha_hora datetime NOT NULL,
  dni varchar(8) NOT NULL,
  medico_id int NOT NULL,
  FOREIGN KEY (dni) REFERENCES PACIENTE(dni),
  FOREIGN KEY (medico_id) REFERENCES MEDICO(medico_id)
);

CREATE TABLE AMBULATORIO
(
  abulatorio_id int auto_increment primary key,
  primera_vez boolean NOT NULL default false,
  diagnostico varchar(255) NOT NULL,
  ingreso_id int NOT NULL,
  FOREIGN KEY (ingreso_id) REFERENCES INGRESO(ingreso_id)
);

CREATE TABLE INTERNACION
(
  internacion_id int auto_increment primary key,
  fecha_internacion date NOT NULL,
  fecha_egreso date,
  nro_habitacion varchar(3) NOT NULL,
  nro_cama smallint,
  ingreso_id int NOT NULL,
  diagnostico varchar(25),
  FOREIGN KEY (ingreso_id) REFERENCES INGRESO(ingreso_id)
);

CREATE TABLE INTERCONSULTA
(
  medico_id int NOT NULL,
  internacion_id int NOT NULL,
  fecha_consulta date NOT NULL,
  diagnostico varchar(255) NOT NULL,
  PRIMARY KEY (internacion_id, medico_id),
  FOREIGN KEY (medico_id) REFERENCES MEDICO(medico_id),
  FOREIGN KEY (internacion_id) REFERENCES INTERNACION(internacion_id)
);

/*paciente*/
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('41302801', 'ALBERTO', 'DIAZ', '1989/04/07', '3755204567');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('7586303', 'PEDRO', 'GAUNA', '1973/08/12','3764234567');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('35683452', 'ROSALIA', 'KUSIAK', '1980/06/25','3755423456');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('47728535', 'RICARDO ', 'MEZA', '1989/01/16', '3764897689');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono )  
VALUES ('4464774', 'CRISTINA', 'MONDRAK','1950/10/28','3755268905');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('40283978', 'MARCELA', 'PELLIZER', '1991/05/20', '3751678943');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('17414258', 'VICTOR', 'ROSNICI', '1965/11/22', '3764214562');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('55616568', 'VALERIA', 'PEREYRA', '2018/09/16', '3764589871');
INSERT INTO `database_integrador`.`paciente` (dni, nombre, apellido, fecha_nacimiento, telefono ) 
VALUES ('11808105', 'LUCIA', 'WESEK', '1955/12/20','3755213214');

/*medico*/
INSERT INTO `database_integrador`. `medico` (medico_id, matricula, nombre, apellido, especialidad, telefono) 
VALUES ('1', '9821', 'JOSE', 'FERNANDEZ', 'CIRUGIA', '3764258912');
INSERT INTO `database_integrador`.`medico` (medico_id, matricula, nombre, apellido, especialidad, telefono) 
VALUES ( '2','1235', 'ANALIA', 'CORTI', 'CLINICA GENERAL', '375542613');
INSERT INTO `database_integrador`.`medico` (medico_id, matricula, nombre, apellido, especialidad, telefono) 
VALUES ('3', '8452', 'CRISTINA', 'ALEXANDRE', 'PEDIATRA', '3764257312');
INSERT INTO `database_integrador`.`medico` (medico_id, matricula, nombre, apellido, especialidad, telefono) 
VALUES ('4', '6324', 'ROSANA', 'PEREZ', 'GINECOLOGIA', '3764985321' );
INSERT INTO `database_integrador`.`medico` (medico_id, matricula, nombre, apellido, especialidad, telefono) 
VALUES ('5','5213', 'VICTOR', 'GOMEZ', 'CARDIOLOGIA', '3755964182');
INSERT INTO `database_integrador`.`medico` (medico_id, matricula, nombre, apellido, especialidad, telefono) 
VALUES ( '6', '3214', 'ESTEBAN', 'GARCIA', 'TRAUMATOLOGIA', '3755986431');


/*ingreso*/
INSERT INTO `database_integrador`. `ingreso` (ingreso_id, fecha_hora ,  dni,  medico_id)
VALUES ('1',  '2024/04/04 15:00', '55616568', '3');
INSERT INTO `database_integrador`. `ingreso` (ingreso_id, fecha_hora ,  dni,  medico_id)
VALUES ('2', '2024/06/12 12:30', '4464774', '4');
INSERT INTO `database_integrador`. `ingreso` (ingreso_id, fecha_hora ,  dni,  medico_id)
VALUES ('3', '2024/07/10', '41302801', '6');
INSERT INTO `database_integrador`. `ingreso` (ingreso_id, fecha_hora ,  dni,  medico_id)
VALUES ('4', '2024/07/12', '41302801', '6');
INSERT INTO `database_integrador`. `ingreso` (ingreso_id, fecha_hora ,  dni,  medico_id)
VALUES ('5', '2024/08/12', '11808105', '1');
INSERT INTO `database_integrador`. `ingreso` (ingreso_id, fecha_hora ,  dni,  medico_id)
VALUES ('6', '2024/08/15', '41302801', '5');
INSERT INTO `database_integrador`. `ingreso` (ingreso_id, fecha_hora ,  dni,  medico_id)
VALUES ('7', '2024/09/02 16:00', '40283978', '2' )


/*ambulatorio*/
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id ) 
VALUES  ( '1' , '1', 'SINDROME FEBRIL', '1');
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id )
VALUES ('2', '1', 'AMENORREA', '2');
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id )
VALUES ('3', '0',  'AMENORREA', '3');
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id )
 VALUES ('4', '1',  'TRAUMATISMO DE BRAZO', '4');
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id ) 
VALUES ('5', '1', 'CONTROL TRUAMTISMO', '5');
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id )
VALUES ('6', '1',  'DOLOR ABDOMINAL', '6');
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id )
 VALUES ('7','1', 'HTA', '7');
INSERT INTO `database_integrador`.`ambulatorio` (ambulatorio_id, primera_vez ,  diagnostico, ingreso_id )
VALUES ('8', 'F',  'CEFALEA', '8')

/*internacion*/
INSERT INTO `database_integrador`.`internacion` (internacion_id, fecha_internacion, fecha_egreso, 
nro_habitacion, nro_cama, ingreso_id, diagnostico) 
VALUES ('1', '2024/04/04',  '2024/04/06', 'a', '1', '7','SINDROME FEBRIL');
INSERT INTO `database_integrador`.`internacion` (internacion_id, fecha_internacion, fecha_egreso, 
nro_habitacion, nro_cama, ingreso_id, diagnostico)  
VALUES ('2', '2024/06/14',  '2024/06/15' , 'a', '2', '2','AMENORREA',);
INSERT INTO `database_integrador`.`internacion` (internacion_id, fecha_internacion, fecha_egreso, 
nro_habitacion, nro_cama, ingreso_id, diagnostico) 
VALUES ('3','2024/07/12',  '2024/07/13' , 'b', '1', '3','TRAUMATISMO DE BRAZO',);
INSERT INTO `database_integrador`.`internacion` (internacion_id, fecha_internacion, fecha_egreso,
nro_habitacion, nro_cama, ingreso_id, diagnostico) 
VALUES ('4','2024/08/12', , '2024/08/14', 'c', '1', '5','APENDICITIS AGUDA');
INSERT INTO `database_integrador`.`internacion` (internacion_id, fecha_internacion, fecha_egreso,
nro_habitacion, nro_cama, ingreso_id, diagnostico) 
VALUES ('5','2024/08/15',  '2024/08/17 ', 'c', '2', '6','CRISIS HIPERTENSIVA',);


