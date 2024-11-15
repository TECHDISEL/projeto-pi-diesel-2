-- BANCO DE DADOS DA TECH DIESEL - SPRINT 3 --


USE tech_diesel;

/*TABELA DE CADASTRO DA EMPRESA*/
CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
nomeFantasia VARCHAR(45),
razaoSocial VARCHAR(45),
telefone CHAR(11),
codigo_ativacao CHAR(8)
);

INSERT INTO Empresa (idEmpresa,CNPJ,nomeFantasia, razaoSocial, telefone, codigo_ativacao) VALUES 
(DEFAULT,'12.345.678/0001-90', 'Fazendas Frizza', 'Agro & Comércio Ltda', '12345678901', 'TCHDL001');

/*  TABELAS PARA USUÁRIO E CADASTRO  */
CREATE TABLE usuario (
idUsuario INT AUTO_INCREMENT,
fkEmpresa INT,
fkResponsavel INT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45),
cargo VARCHAR(45),

CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkEmpresa),
CONSTRAINT fkUsuarioEmpresa foreign key (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT fkUsuarioResponsavel FOREIGN KEY (fkResponsavel) REFERENCES usuario (idUsuario)
);

/*
INSERT INTO usuario (idUsuario, fkEmpresa, fkResponsavel, nome, email, senha, cargo) VALUES 
(1, 1, 1,'Admin', 'admin@admin.com', 'Admin123@', 'Admin'),
(2, 1, 1, 'Frizza', 'frizza@example.com', 'Fr@123', 'Dono'),     
(3, 1, 1, 'Julia', 'julia@example.com', 'Ju@123', 'Supervisora'); */

/* TABELA PARA ENDEREÇO*/
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
fkEmpresa INT,
fkSensor INT,
setor VARCHAR(45),
alturaMetro INT,
raio DECIMAL(2,1),

CONSTRAINT fkEmpresaTanque FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CONSTRAINT fkSensorTanque FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);

INSERT INTO tanque (fkEmpresa, fkSensor, setor, alturaMetro, raio) VALUES
(1, 1, 'Irrigação', '4', '2.0');

/*  TABELAS PARA MEDIDA*/
CREATE TABLE medida (
idMedida INT,
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


SELECT 
    tanque.idTanque,
    tanque.nome AS tanque_nome,
    tanque.capacidade,
    s.idSensor,
    s.dataInstalacao AS dataInstalacao,
    medida.idMedida,
    medida.leitura,
    m.dataLeitura
FROM 
    tanque t
LEFT JOIN 
    sensor s ON t.fkSensor = s.idSensor
LEFT JOIN 
    medida m ON m.fkSensor = s.idSensor;
    
SELECT 
    empresa.CNPJ,
    empresa.nomeFantasia,
    empresa.razaoSocial,
    usuario.nome AS usuario_nome,
    usuario.email AS email_usuario,
    endereco.rua,
    endereco.bairro,
    endereco.numero,
    endereco.CEP,
    endereco.cidade,
    endereco.uf,
    sensor.idSensor,
    sensor.dataInstalacao AS dataInstalacao,
    tanque.idTanque,
    tanque.nome AS tanque_nome,
    tanque.capacidade,
    medida.idMedida,
    medida.leitura,
    medida.dataLeitura
FROM 
    empresa
LEFT JOIN 
    usuario ON empresa.idEmpresa = usuario.fkEmpresa
LEFT JOIN 
    endereco ON empresa.idEmpresa = endereco.fkEmpresa
LEFT JOIN 
    tanque ON empresa.idEmpresa = tanque.fkEmpresa
LEFT JOIN 
    sensor ON tanque.fkSensor = sensor.idSensor
LEFT JOIN 
    medida ON sensor.idSensor = medida.fkSensor;
    
SELECT*FROM medida;