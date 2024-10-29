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
idUsuario INT,
fkCNPJ INT,
fkResponsavel INT,
nome VARCHAR(45),
senha VARCHAR(45),

CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkCNPJ),
CONSTRAINT fkUsuarioResponsavel FOREIGN KEY (fkResponsavel) REFERENCES usuario (idUsuario)
);

INSERT INTO usuario (idUsuario, fkCNPJ,fkResponsavel, nome, senha) VALUES 
(1, 1, 1,'Admin', 'Admin123@'),
(2, 1, 1, 'Frizza', 'Fr@123'),     
(3, 1, 1, 'Julia', 'Ju@123');


/* TABELA PARA ENDEREÇO*/
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


/* TABELA PARA SENSOR*/
CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT, 
identificacao VARCHAR(100)
);

INSERT INTO sensor VALUES 
(DEFAULT, 'Monitoramento Abastecimento de Tratores'),
(DEFAULT, 'Monitoramento Abastecimento de Máquinas Pesadas'),
(DEFAULT, 'Monitoramento Abastecimento Sistema de Irrigação');


/*  TABELAS PARA TANQUE*/
CREATE TABLE tanque (
idTanque INT PRIMARY KEY AUTO_INCREMENT,
fkCadastro CHAR(18),
fkSensor INT,
nome VARCHAR(45),
capacidade INT,

CONSTRAINT fkCadastroTanque FOREIGN KEY (fkCadastro) REFERENCES cadastro (CNPJ),
CONSTRAINT fkSensorTanque FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);

INSERT INTO tanque VALUES
(DEFAULT, '12.345.678/0001-90', 1, 'Tanque 1', 10000),
(DEFAULT, '12.345.678/0001-90', null, 'Tanque 2', 10000),
(DEFAULT, '12.345.678/0001-90', null, 'Tanque 3', 15000);


/*  TABELAS PARA MEDIDA*/
CREATE TABLE medida (
idMedida INT PRIMARY KEY AUTO_INCREMENT,
fkSensor INT,
leitura DECIMAL(12,2),
dataLeitura DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fkMedidaSensor FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);


SELECT t.idTanque, t.nome AS nome_tanque, c.nome AS nome_empresa
FROM tanque t
LEFT JOIN cadastro c ON t.fkCadastro = c.CNPJ;

















/* Consulta */
SELECT 
    tanque.nome AS 'Nome do tanque',
    tanque.capacidade AS 'Capacidade do tanque',
    sensor.identificacao AS 'Identificação do Sensor',
    medida.leitura AS 'Leitura do Sensor', 
    medida.dataLeitura AS 'Data da leitura'
FROM 
    tanque
JOIN
    sensor 
ON 
    tanque.idTanque = sensor.fkTanque
JOIN 
    medida 
ON 
    sensor.idSensor = medida.fkSensor
ORDER BY medida.leitura LIMIT 5;

/* Select para unir todos os dados */
SELECT
    usuario.nome AS 'Nome Funcionário', -- Usuario
    responsavel.nome AS 'Responsavel Legal', -- Usuario
    concat(endereco.rua, ', ', endereco.bairro, ', ', endereco.numero, ', ', endereco.CEP, ', ', endereco.cidade, ' - ', endereco.uf) AS 'Endereço', -- Endereco
    tanque.nome AS 'Nome do Tanque', -- Tanque
    sensor.identificacao, -- Sensor
    medida.leitura, medida.dataLeitura -- Medida
FROM 
    usuario
LEFT JOIN
    usuario AS responsavel
ON
    usuario.fkResponsavel = responsavel.idUsuario
LEFT JOIN
    cadastro
ON
    usuario.fkCNPJ = cadastro.cnpj -- JOIN correto com a tabela cadastro
LEFT JOIN
    endereco
ON
    endereco.fkCNPJ = cadastro.CNPJ -- CNPJ relacionado à tabela cadastro
LEFT JOIN
    tanque
ON
    tanque.fkUsuario = usuario.idUsuario
LEFT JOIN
    sensor
ON
    sensor.fkTanque = tanque.idTanque
LEFT JOIN
    medida
ON
    medida.fkSensor = sensor.idSensor;
