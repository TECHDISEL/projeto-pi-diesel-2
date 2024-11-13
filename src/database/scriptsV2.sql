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
fkCNPJ CHAR(18),
fkResponsavel INT,
nome VARCHAR(45),
senha VARCHAR(45),

CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkCNPJ),
CONSTRAINT fkUsuarioResponsavel FOREIGN KEY (fkResponsavel) REFERENCES usuario (idUsuario)
);

INSERT INTO usuario (idUsuario, fkCNPJ,fkResponsavel, nome, senha) VALUES 
(1, '12.345.678/0001-90', 1,'Admin', 'Admin123@'),
(2, '12.345.678/0001-90', 1, 'Frizza', 'Fr@123'),     
(3, '12.345.678/0001-90', 1, 'Julia', 'Ju@123');


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
dataInstalacao DATE
);

INSERT INTO sensor VALUES 
(DEFAULT, '2024-10-31'),
(DEFAULT, '2024-11-01'),
(DEFAULT, '2024-11-01');


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

SELECT 
    t.idTanque,
    t.nome AS tanque_nome,
    t.capacidade,
    s.idSensor,
    s.identificacao AS sensor_identificacao,
    m.idMedida,
    m.leitura,
    m.dataLeitura
FROM 
    tanque t
LEFT JOIN 
    sensor s ON t.fkSensor = s.idSensor
LEFT JOIN 
    medida m ON m.fkSensor = s.idSensor;
    
SELECT 
    c.CNPJ,
    c.nome AS empresa_nome,
    c.nomeFantasia,
    c.razaoSocial,
    u.idUsuario,
    u.nome AS usuario_nome,
    e.rua,
    e.bairro,
    e.numero,
    e.CEP,
    e.cidade,
    e.uf,
    s.idSensor,
    s.identificacao AS sensor_identificacao,
    t.idTanque,
    t.nome AS tanque_nome,
    t.capacidade,
    m.idMedida,
    m.leitura,
    m.dataLeitura
FROM 
    cadastro c
LEFT JOIN 
    usuario u ON c.CNPJ = u.fkCNPJ
LEFT JOIN 
    endereco e ON c.CNPJ = e.fkCNPJ
LEFT JOIN 
    tanque t ON c.CNPJ = t.fkCadastro
LEFT JOIN 
    sensor s ON t.fkSensor = s.idSensor
LEFT JOIN 
    medida m ON s.idSensor = m.fkSensor;
    
SELECT*FROM medida;