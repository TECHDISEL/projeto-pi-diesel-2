var database = require("../database/config");

function buscarUltimasMedidas(idTanque, limite_linhas) {

    var instrucaoSql = `
    SELECT 
        round(PI() * POW(tanque.raio, 2) * (tanque.alturaMetro - (medida.leitura/100)),0) * 1000 AS leitura,
        medida.fkSensor,
        dataLeitura,
        DATE_FORMAT(dataLeitura,'%H:%i:%s') as dataLeitura
    FROM medida
    JOIN sensor ON medida.fkSensor = sensor.idSensor
    JOIN tanque ON sensor.idSensor = tanque.fkSensor
    WHERE medida.fkSensor = ${idTanque}
    ORDER BY idMedida DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idTanque) {

    var instrucaoSql = `
    SELECT
        idMedida,
        round(PI() * POW(tanque.raio, 2) * (tanque.alturaMetro - (medida.leitura/100)),0) * 1000 AS leitura,
        medida.fkSensor,
        dataLeitura,
        DATE_FORMAT(dataLeitura,'%H:%i:%s') as dataLeitura,
        tanque.raio,
        tanque.alturaMetro
    FROM medida
    JOIN sensor ON medida.fkSensor = sensor.idSensor
    JOIN tanque ON sensor.idSensor = tanque.fkSensor
    WHERE medida.fkSensor = ${idTanque}
    ORDER BY idMedida DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasMensais(idTanque) {

    var instrucaoSql = `
    SELECT 
	    SUM(leitura) AS leituraDoMes,
        MONTH(dataLeitura) AS mesAtual
    FROM medida
    JOIN sensor ON sensor.idSensor = medida.fkSensor 
    JOIN tanque ON sensor.idSensor = tanque.fkSensor
    WHERE idTanque = ${idTanque}
    GROUP BY MONTH(dataLeitura);
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasMensais
}
