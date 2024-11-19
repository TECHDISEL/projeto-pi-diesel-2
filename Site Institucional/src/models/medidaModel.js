var database = require("../database/config");

function buscarUltimasMedidas(idTanque, limite_linhas) {

    var instrucaoSql = `
    SELECT 
        round(PI() * POW(tanque.raio, 2) * (tanque.alturaMetro - (medida.leitura/100)),0) * 1000 AS leitura,
        medida.fkSensor,
        dataLeitura,
        DATE_FORMAT(dataLeitura, '%M') AS mes,
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
        round(PI() * POW(tanque.raio, 2) * (tanque.alturaMetro - (medida.leitura/100)),0) * 1000 AS leitura,
        medida.fkSensor,
        dataLeitura,
        DATE_FORMAT(dataLeitura,'%H:%i:%s') as dataLeitura
    FROM medida
    JOIN sensor ON medida.fkSensor = sensor.idSensor
    JOIN tanque ON sensor.idSensor = tanque.fkSensor
    WHERE medida.fkSensor = ${idTanque}
    ORDER BY idMedida DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
