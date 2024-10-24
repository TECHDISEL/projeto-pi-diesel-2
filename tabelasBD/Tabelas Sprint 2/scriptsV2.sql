CREATE DATABASE tech_diesel;
USE tech_diesel;

/*TABELA DE CADASTRO DA EMPRESA*/
CREATE TABLE cadastro (
CNPJ CHAR(18) PRIMARY KEY,
nome VARCHAR(45),
nomeFantasia VARCHAR(45),
razaoSocial VARCHAR(45),
telefone CHAR(11),
email VARCHAR(45),
senha VARCHAR(45)
);

INSERT INTO cadastro (CNPJ, nome, nomeFantasia, razaoSocial, telefone, email, senha) VALUES 
('12.345.678/0001-90', 'Claudio Frizzarini', 'Fazendas Frizza', 'Agro & Comércio Ltda', '12345678901', 'frizza@example.com', 'senhaFrizza');

/*  TABELAS PARA USUÁRIO E CADASTRO  */
CREATE TABLE usuario (
idUsuario INT PRIMARY KEY,
fkResponsavel INT,
fkCadastro INT,
nome VARCHAR(45),
senha VARCHAR(45),

CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkCNPJ),
CONSTRAINT fkUsuarioResponsavel FOREIGN KEY (fkResponsavel) REFERENCES usuario (idUsuario)
);

INSERT INTO usuario (idUsuario, fkResponsavel, nome, senha) VALUES 
(1, NULL, 'Admin', 'Admin123@'),
(2, 1, 'Frizza', 'Fr@123'),     
(3, 1, 'Julia', 'Ju@123');


CREATE TABLE endereco (
idEndereco INT,
fkCNPJ CHAR(18) UNIQUE,
rua VARCHAR(45),
bairro VARCHAR(45),
numero INT,
CEP CHAR(8),
cidade VARCHAR(45),
uf CHAR(2),

CONSTRAINT pkCompostaEndereco PRIMARY KEY (idEndereco, fkCNPJ),
CONSTRAINT fkCNPJEndereco FOREIGN KEY (fkCNPJ) REFERENCES cadastro (CNPJ)
);

INSERT INTO endereco (idEndereco, fkCNPJ, rua, bairro, numero, CEP, cidade, uf) VALUES 
(1, '12.345.678/0001-90', 'Rua das Flores', 'Centro', 123, '01234567', 'São Paulo', 'SP');

/*  TABELAS PARA TANQUE E SENSOR  */
CREATE TABLE tanque (
idTanque INT,
fkCliente INT,
nome VARCHAR(45),
capacidade INT,

CONSTRAINT pkCompostaTanque PRIMARY KEY (idTanque, fkCliente),
CONSTRAINT fkClienteTanque FOREIGN KEY (fkCliente) REFERENCES cliente (idCliente)
);

INSERT INTO tanque VALUES
(1, 2, 'Tanque 1', 10000),
(2, 2, 'Tanque 2', 10000),
(3, 2, 'Tanque 3', 15000);

CREATE TABLE sensor (
idSensor INT UNIQUE, 
fkTanque INT UNIQUE,
identificacao VARCHAR(100),

CONSTRAINT pkCompostaSensor PRIMARY KEY (idSensor, fkTanque),
CONSTRAINT fkTanqueSensor FOREIGN KEY (fkTanque) REFERENCES tanque (idTanque)
);

INSERT INTO sensor VALUES 
(1, 1, 'Monitoramento Abastecimento de Tratores'),
(2, 2, 'Monitoramento Abastecimento de Máquinas Pesadas'),
(3, 3, 'Monitoramento Abastecimento Sistema de Irrigação');

CREATE TABLE medida (
idMedida INT PRIMARY KEY AUTO_INCREMENT,
fkSensor INT,
leitura DECIMAL(12,2),
dataLeitura DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fkMedidaSensor FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);

SELECT 
	tanque.nome AS 'Nome do tanque',
    tanque.capacidade AS 'Capacidade do tanque',
	sensor.identificacao AS 'Identificação do Sensor',
    medida.leitura AS 'Leitura do Sensor', 
    dataLeitura AS 'Data da leitura'
FROM 
	tanque
JOIN
	sensor
ON
	idTanque = fkTanque
JOIN 
	medida 
ON 
	idSensor = fkSensor
ORDER BY leitura LIMIT 5; 

/* Select para unir todos os dados */
SELECT
	usuario.nome AS 'Nome Funcionário', -- Usuario
    responsavel.nome AS 'Responsavel Legal', -- Usuario
    concat(rua, ', ', bairro, ', ',  numero, ', ',  CEP, ', ', cidade, ' - ', uf) AS 'Endereço', -- Endereco
    tanque.nome AS 'Nome do Tanque', -- Tanque
    sensor.identificacao, -- Sensor
    leitura, dataLeitura -- Medida
FROM 
	usuario
LEFT JOIN
	usuario AS responsavel
ON
	usuario.fkResponsavel = responsavel.idUsuario
LEFT JOIN
	cadastro
ON
	cadastro.fkUsuario = usuario.idUsuario
LEFT JOIN
	endereco
ON
	endereco.fkCNPJ = cadastro.CNPJ
LEFT JOIN
	tanque
ON
	tanque.fkUsuario = cliente.idCliente
LEFT JOIN
	sensor
ON
	sensor.fkTanque = tanque.idTanque
LEFT JOIN
	medida
ON
	medida.fkSensor = sensor.idSensor;