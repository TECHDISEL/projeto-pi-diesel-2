use sprint2;

CREATE TABLE cliente(
idCliente int primary key auto_increment,
cnpj char(14) not null,
nome varchar(40) not null,
telefone varchar(11),
endereco varchar(30),
responsavel varchar(15),
email varchar(30),
senha varchar(30)
);

create table tanque(
idTanque int primary key auto_increment,
capacidadeLitros decimal(10,2),
fkCliente int,
constraint fktanquecliente foreign key (fkCliente)
	references cliente(idCliente)
);

create table sensor(
idsensor int primary key auto_increment,
nivel varchar(10),
dataehora datetime not null,
fkTanque int,
constraint fksensortanque foreign key (fkTanque)
	references tanque(idTanque)
);
