use sprint2;

CREATE TABLE cliente(
idCliente int primary key auto_increment,
cnpj char(14) not null,
nome varchar(40) not null,
telefone varchar(11),
endereco varchar(30),
responsavel varchar(15),
email varchar(30)
);

create table sensor(
idsensor int primary key auto_increment,
nivel varchar(10),
dataehora datetime not null,
fkCliente int,
constraint fksensorcliente foreign key (fkCliente)
	references cliente(idCliente)
);

create table tanque(
idTanque int primary key auto_increment,
capacidadeLitros decimal(10,2),
tipoTanque varchar(10) not null,
CONSTRAINT chkTipoTanque CHECK (tipotanque IN ('Vertical', 'Horizontal')),
fkCliente int,
constraint fktanquecliente foreign key (fkCliente)
	references cliente(idCliente)
);