use sprint2;

CREATE TABLE cliente(
idCliente int primary key auto_increment,
cnpj char(14) not null,
nome varchar(40) not null,
telefone varchar(11),
endereco varchar(30),
responsavel varchar(15),
email varchar(30) not null,
senha varchar(45) not null
);

create table sensor(
idsensor int primary key auto_increment,
nivel varchar(10),
dataehora datetime not null
);

create table tanque(
idTanque int primary key auto_increment,
capacidadeLitros decimal(10,2),
fkSensor int,
fkCliente int,
constraint fktanquesensor foreign key (fkSensor)
	references sensor(idSensor),
constraint fkclientetanque foreign key (fkCliente)
	references cliente(idCliente)
);

