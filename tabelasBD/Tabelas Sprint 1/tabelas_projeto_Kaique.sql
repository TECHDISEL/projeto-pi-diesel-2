create database projetoDiesel;
use projetoDiesel;
-- 

-- # TABELA 1 - CADASTRO
create table cadastro (
idCliente int primary key auto_increment,
nomeEmpresa varchar(30) not null,
CNPJ char(14) not null,
email varchar(50) not null,
senha varchar(30) not null,
telefone char(10),
zonaSP varchar(7)
	constraint chkZona
		check (zonaSP in ('Central', 'Norte', 'Sul', 'Leste', 'Oeste')),
CEP char(8)
);

insert into cadastro values 
	(default, 'TechDiesel', '1xxxxxxx0001xx', 'diesel@tech.com', '#senhaForte!', '1141231234', 'Central', '01234000'),
    (default, 'Carrara Diesel', '2xxxxxxx0001xx', 'carrara@diesel.com', '#CarraraTaxiCarrara', '1142342345', 'Sul', '02456000'),
    (default, 'Distri-Diesel', '3xxxxxxx0001xx', 'diesel@distri', '#distribuidoraDistri', '1143453456', 'Central', '03456000');

-- proteger a senha do cliente
select
	nomeEmpresa as 'Nome da empresa',
    CNPJ,
    email as 'E-mail',
    telefone as 'Telefone para contato',
    zonaSP as 'Zona da Grande SP',
    CEP
		from cadastro;
    
-- filtrar zonas
select
    nomeEmpresa as 'Nome da Empresa',
    zonaSP as 'Zona da Grande SP',
    CEP
		from cadastro
		where zonaSP = 'Central';
    

-- recuperação de senha
select 
	concat('Responsável pela ', nomeEmpresa, ', enviamos por E-mail as devidas instruções para recuperação de senha') as 'Procedimento',
    email as 'E-mail fornecido para a recuperação'
		from cadastro
		where nomeEmpresa = 'Carrara Diesel';
--

-- #TABELA 2 - SENSOR
create table sensor (
idDado int primary key auto_increment,
sensor varchar(7) not null
	constraint chkSensor
		check (sensor in ('LM35', 'HC-SR04')),
funcao char(11) not null
	constraint chkFuncao
		check (funcao in ('Temperatura', 'Proximidade')),
dado varchar(6) not null,
dtHora datetime default current_timestamp not null 
);

insert into sensor values
	(default, 'LM35', 'Temperatura', 22.1, default),
    (default, 'LM35', 'Temperatura', 24.5, '2024-09-07 10:22:32'),
    (default, 'HC-SR04', 'Proximidade', 5, default),
    (default, 'HC-SR04', 'Proximidade', 2, '2024-09-07 10:22:32');
    
-- filtrar dados de temperatura
select
	sensor as 'Sensor',
    concat(dado, ' C°') as 'Informação captada',
    dtHora as 'Perído da captação'
		from sensor
		where sensor = 'LM35';
    
-- filtrar dados de proximidade
select
    sensor as 'Sensor',
    concat(dado, ' cm') as 'Informação captada' ,
    dtHora as 'Perído da captação'
		from sensor
		where sensor = 'HC-SR04';
    
-- filtrar por data
select
	dtHora as 'Período da captação',
	dado as 'Informação captada',
    sensor as 'Sensor',
    funcao as 'Função'
		from sensor
		where dtHora = '2024-09-08 10:26:43';
        
-- filtrar por registro mais recente para mais antigo
select
	sensor as 'Sensor',
    funcao as 'Função',
    dado as 'Dado captado',
    dtHora as 'Período da captação'
		from sensor
			order by dtHora desc;
		
    
    

    
    