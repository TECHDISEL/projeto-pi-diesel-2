Create Database techdiesel;
use techdiesel;
create table login (
idEmpresa int primary key auto_increment,
nomeEmpresa varchar (50),
senha tinyint (10),
emailempresa varchar(30)
);

alter table login modify column senha float; 

insert into login values 
(default, 'Petrobras', 031053, 'leonardo.silva@petrobras.com');

select * from login;

desc login; 
-------------------------------------------------------------------------------------------------------------------
create table sensores (
idLog int primary key auto_increment,
registroTemp float,
registroVolume float,
dtLog datetime default current_timestamp
);

insert into sensores values 
(default, 23, 2, now() ); -- Aqui será lido 23º graus e 2 metros até o teto do tanque

desc login;

-------------------------------------------------------------------------------------------------------------------
-- (Desejável) Já será incluido na premissa qual tanque será usado então não será necessário enquanto a aplicabilidade 
-- é apenas com 1 tipo de Tanque, porém ainda sim é necessário a incersão de altura e diametro do tanque.
create table tanques (
idTanque int primary key auto_increment,
modelo varchar(50),
constraint chkModelo check (modelo in ('tanque atm')),
diametro int,
altura int
);

insert into tanques values 
(default,'tanque atm',20 ,10);
desc tanques;
-------------------------------------------------------------------------------------------------------------------
-- (Desejável) Já será incluido na premissa qual diesel será usado então não será necessário enquanto a aplicabilidade é apenas com 1 tipo de Diesel
create table diesel (
idDiesel int primary key auto_increment,
tipoDiesel varchar(12),
constraint chkTipo check(tipoDiesel in ('S-10')),
tempIdeal tinyint,
volIdeal tinyint,
coefDiesel tinyint
); 

desc diesel;


