create database diesel;
use diesel;

create table cadastro (
idCad int primary key auto_increment,
nome varchar(200),
cnpj char(14),
tel varchar(15),
email varchar(45),
cep char(8),
senha varchar(20)
);

truncate table cadastro;

insert into cadastro values
(default,'Empresas Óleo Diesel','12345678900000','(11)93355-6677','oleodiesel@email.com',
'00000000','Password12345');

select idCad as ID,
nome as 'Nome da Empresa',
cnpj as CNPJ,
tel as Telefone,
email as 'E-mail para contato',
cep as CEP,
senha as Senha
from cadastro;

-- ----------------------------------------------------------------------------------------------------------------------------------------------------------

create table arduinoT (
idTemp int primary key auto_increment,
Hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
temperatura float not null,
urgencia varchar(20),
constraint chkUrgencia check (urgencia in ('leve','média','alta')),
comentarios varchar(140)
);

desc arduinoT;

insert into arduinoT values
(default,default,20,'leve',null),
(default,default,40,'alta','Ajustar ar condicionado para o verão.'),
(default,default,10,'média','Atenção à densidade do Diesel no clima frio');

select hora as Horário,
temperatura as 'Temperatura (ºC)',
urgencia as Urgência,
ifnull (comentarios,'[Sem comentários]') as 'Comentários adicionais:'
from arduinoT;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------

create table arduinoU (
idUltra int primary key auto_increment,
hora timestamp default current_timestamp not null,
distancia float not null,
urgencia varchar(20),
constraint chkStatus check (urgencia in ('leve','média','alta')),
comentarios varchar(140)
);

desc arduinoU;

insert into arduinoU values
(default,default,50,'leve',null),
(default,default,10,'média','O líquido pode transbordar'),
(default,default,3,'alta','A qualquer momento');

select hora as Horário,
distancia as 'Distância da borda (cm)',
urgencia as Urgência,
ifnull(comentarios,'[SEM COMENTÁRIOS]') as 'Comentários adicionais:' from arduinoU;