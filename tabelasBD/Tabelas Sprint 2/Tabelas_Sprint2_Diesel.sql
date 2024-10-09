create database  tech_diesel;
use tech_diesel;

CREATE TABLE cliente(
idCliente int primary key auto_increment,
cnpj char(14) not null,
nome varchar(40) not null,
responsavel varchar(15),
fkEndereco int,
	constraint fkEndereçoCliente foreign key (fkEndereco)
		references endereço(idEndereco)
);

CREATE TABLE endereço(
idEndereco int primary key auto_increment,
rua varchar(45),
bairro varchar(45),
num int, 
cep varchar(8),
cidade varchar(45)
);

CREATE TABLE login(
idLogin int,
emailCliente varchar(20),
senhaCliente varchar(10),
telefone varchar(12),
fkCliente int,
	constraint fkClienteLogin foreign key (fkCliente)
		references cliente(idCliente)
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
nivel decimal(10,2),
dataehora datetime default current_timestamp not null,
fkTanque int,
constraint fksensortanque foreign key (fkTanque)
	references tanque(idTanque)
);

select * from tanque;

INSERT INTO cliente VALUES
(default, '12345678000195', 'Fazenda Boa Vista', '1195986704', 'Estrada Rural, Km 23', 'José Almeida', 'contato@boavistaagro.com', 'boavista123'),
(default, '98765432000187', 'Agropecuária Rio Verde', '11876543210', 'Rodovia BR-101, Km 45', 'Ana Martins', 'ana@rioveverdeagro.com', 'rioverde2024'),
(default, '45612378000123', 'Cooperativa Agro Rural', '11766554433', 'Rodovia SP-150, Km 1209', 'Carlos Lima', 'contato@coagrorural.com', 'coopRural987');

INSERT INTO tanque VALUES
(default, 5000.00, 1), 
(default, 10000.00, 2), 
(default, 2000.00, 3);

INSERT INTO sensor VALUES
(default, 3000.00, '2024-09-28 10:30:00', 1),  
(default, 5000.00, '2024-09-28 12:00:00', 2), 
(default, 1200.00, '2024-09-28 11:45:00', 3);  

SELECT cliente.*, tanque.capacidadeLitros
FROM cliente JOIN tanque ON tanque.fkCliente = cliente.idCliente; 

SELECT
	cliente.idCliente as ID,
	cliente.nome AS Cliente,
    cliente.cnpj AS CNPJ,
    tanque.idTanque,
    tanque.capacidadeLitros as Capacidade_L,
    sensor.nivel as NivelSensor,
    sensor.dataehora AS HorarioMedição
FROM
	cliente
JOIN 
	tanque ON cliente.idCliente = tanque.fkCliente
JOIN
	sensor ON tanque.idTanque = sensor.fkTanque;
    
UPDATE tanque set capacidadeLitros = 5000 
	where idTanque = 1; 

