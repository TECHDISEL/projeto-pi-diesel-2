-- BANCO DE DADOS DA TECH DIESEL - SPRINT 3 --

CREATE DATABASE tech_diesel;
USE tech_diesel;

/* =================================================
		   TABELA DE CADASTRO DA EMPRESA
================================================= */
CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
nomeFantasia VARCHAR(45),
razaoSocial VARCHAR(45),
telefone CHAR(11),
codigo_ativacao CHAR(8)
);

INSERT INTO Empresa (idEmpresa,CNPJ,nomeFantasia, razaoSocial, telefone, codigo_ativacao) VALUES 
(DEFAULT, '000-000', 'Admin TECHDIESEL', 'TECHDIESEL INC', '123456', 'TCHDL999'), -- CADASTRO DE EMPRESA PARA TESTES INTERNOS
(DEFAULT,'12.345.678/0001-90', 'Fazendas Frizza', 'Agro & Comércio Ltda', '12345678901', 'TCHDL001');

/* =================================================
		 TABELAS PARA USUÁRIO E CADASTRO
================================================= */
CREATE TABLE usuario (
idUsuario INT AUTO_INCREMENT,
fkEmpresa INT,
fkResponsavel INT,
nome VARCHAR(45),
email VARCHAR(45) UNIQUE,
senha VARCHAR(45),
cargo VARCHAR(45),

CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkEmpresa),
CONSTRAINT fkUsuarioEmpresa foreign key (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT fkUsuarioResponsavel FOREIGN KEY (fkResponsavel) REFERENCES usuario (idUsuario)
);

/* =================================================
TABELA PARA ENDEREÇO (SERÃO CADASTRADOS PELA PRÓPRIA TECH DIESEL, VAMOS DISPONIBILIZAR QUE OS USUÁRIOS FAÇAM ALTERAÇÕES)
================================================= */
CREATE TABLE endereco (
idEndereco INT AUTO_INCREMENT,
fkEmpresa INT,
rua VARCHAR(45),
bairro VARCHAR(45),
numero INT,
CEP CHAR(8),
cidade VARCHAR(45),
uf CHAR(2),

CONSTRAINT pkCompostaEndereco PRIMARY KEY (idEndereco, fkEmpresa),
CONSTRAINT fkEmpresaEndereco FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

INSERT INTO endereco (idEndereco, fkEmpresa, rua, bairro, numero, CEP, cidade, uf) VALUES 
(1, 1, 'Rua das Flores', 'Centro', 123, '01234567', 'São Paulo', 'SP');

/* =========================================================
TABELAS SENSOR, TANQUES E MEDIDAS (MANTIDAS INTERNAMENTE)
========================================================= */
CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT, 
dataInstalacao DATETIME
);

CREATE TABLE tanque (
idTanque INT PRIMARY KEY AUTO_INCREMENT,
fkEmpresa INT,
fkSensor INT,
setor VARCHAR(45),
alturaMetro INT,
raio DECIMAL(2,1),

CONSTRAINT fkEmpresaTanque FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CONSTRAINT fkSensorTanque FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);

INSERT INTO sensor (idSensor, dataInstalacao) VALUES 
(1, '2024-11-16 15:30:00'),
(2, '2024-11-16 16:00:30');

INSERT INTO tanque (idTanque, fkEmpresa, fkSensor, setor, alturaMetro, raio) VALUES
(1, 1, 1, 'Maquinario', '4', '1.7'), -- 35000 L
(2, 1, 2, 'Irrigação', '2', '1.5'); -- 15000 L

/* =========================================================
TABELAS PARA CONTROLES DAS MEDIDAS E ALERTAS DOS SENSORES
========================================================= */
CREATE TABLE medida (
idMedida INT AUTO_INCREMENT,
fkSensor INT,
leitura DECIMAL(6,2),
dataLeitura DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT pkSensorMedida PRIMARY KEY (idMedida, fkSensor),
CONSTRAINT fkMedidaSensor FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);

CREATE TABLE alerta(
idAlerta INT AUTO_INCREMENT,
fkMedida INT,
leitura DECIMAL(6,2),
dataLeitura DATETIME,

CONSTRAINT pkAlertaMedida PRIMARY KEY (idAlerta, fkMedida),
CONSTRAINT  fkAlertaMedida FOREIGN KEY (fkMedida) REFERENCES medida(idMedida)
);