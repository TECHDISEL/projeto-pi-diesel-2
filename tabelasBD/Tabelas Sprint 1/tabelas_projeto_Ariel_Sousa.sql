create database diesel;
use diesel;

CREATE TABLE cadastrocliente(
idcliente int primary key auto_increment,
nomecliente varchar(50) not null,
cnpjcliente char(15) not null,
telefonecliente char(12) not null,
emailcliente varchar(50) not null,
senhacliente varchar(20) not null,
cepcliente char(8) not null,
numeroimovel varchar(5) not null,
procurarpor varchar(20)
);

insert into cadastrocliente values
(default,'Distribuidora Sol', ' 01776432000151', '011998765432', 'distribuidorasol@email.com.br', 'distrosolbrasil011', '06454000', '500', 'Jose'),
(default,'RodOil Distribuidor de Combustiveis SA', '07520438000140', '011912345678', 'rodoildistribuidora@email.com.br', 'RDoil1234', '04071000', '3404', 'Fabiana');
select*from cadastrocliente;

CREATE TABLE sensorultrassonico(
idsensoruts int primary key auto_increment,
alturacaptadacm float not null,
datahorauts timestamp default current_timestamp not null,
);

CREATE TABLE sensortemperatura(
idsensortemp int primary key auto_increment,
temperatura int,
datahoratemp timestamp default current_timestamp not null,
);

CREATE TABLE tanquediesel(
idtanque int primary key auto_increment,
clientetanque varchar(50),
aluratanque float not null,
capacidadelitros float not null,
);