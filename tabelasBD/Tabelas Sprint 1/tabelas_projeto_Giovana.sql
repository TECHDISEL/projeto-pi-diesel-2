create database sprint1;

use sprint1;


create table empresa(
idEmpresa int primary key auto_increment,
nome VARCHAR(50),
email VARCHAR(50) not null,
telefone char(11),
CNPJ char(14) not null,
cep char(8),
numero varchar(10)
);

insert into empresa values 
(default, 'Petrobras Distribuidora', 'petrobras@hotmail.com', '11993006791', '11776414000123', '03254000', '5'),
(default, 'Raízen', 'ipiranga@hotmail.com', '11988776589', '85627436000168', '03256879', '8'),
(default, 'BR Distribuidora', 'brDistribuidora', '11977658976', '64569558000175', '03256890', '250');

create table tanques(
idTanque int primary key auto_increment,
localizacao VARCHAR(50),
capacidade float not null,
altura float not null
);

insert into tanques values 
(default, 'Centro de Distribuição São Paulo', 12000.0, 5.0),
(default, 'Centro de Distribuição Rio de Janeiro', 15000.0, 5.5),
(default, 'Centro de Distribuição Belo Horizonte', 20000.0, 6.0),
(default, 'Centro de Distribuição Curitiba', 10000.0, 4.8),
(default, 'Centro de Distribuição Porto Alegre', 18000.0, 5.2);

create table sensores(
idSensores int primary key auto_increment,
temperatura float,
nivel float,
datalog TIMESTAMP default current_timestamp
);

insert into sensores values
(default, 20.5, 3.2, now()),
(default, 21.0, 3.5, now()),
(default, 21.8, 3.0, now()),
(default, 22.3, 2.8, now()),
(default, 22.7, 2.9, now());

create table sensorLimite (
idLimite int primary key auto_increment,
temperaturaMax float,
temperaturaMin float,
nivelMax float,
nivelMin float
);

insert into sensorLimite values
(default, 30.0, 15.0, 5.0, 1.0), 
(default, 28.0, 10.0, 4.5, 0.5), 
(default, 25.0, 5.0, 6.0, 2.0),   
(default, 35.0, 20.0, 7.0, 1.5);  

create table alertas (
    idAlerta int PRIMARY KEY auto_increment,
    tipoAlerta varchar(50),
    constraint chkTipo 
    check(tipoAlerta in ('Temperatura alta', 'Nível baixo', 'Temperatura baixa', 'Nível alto')),
	datalog TIMESTAMP default current_timestamp,
    tipoSensor varchar(30),
    constraint chkSensor
    Check (tipoSensor in ('temperatura', 'ultrassonico')),
    statusAlerta varchar(20),
    constraint chkStatus
    Check (statusAlerta in ( 'Resolvido', 'Pendente'))
    );
    
insert into alertas values
(default, 'Temperatura alta', now(), 'temperatura', 'Pendente'),
(default, 'Nível baixo', now(), 'ultrassonico', 'Resolvido'),
(default, 'Temperatura baixa', now(), 'temperatura', 'Pendente'),
(default, 'Nível alto', now(), 'ultrassonico', 'Resolvido');

