var database = require("../database/config");

function buscarUltimasMedidas(idTanque, limite_linhas) {

    var instrucaoSql = `
    SELECT 
        leitura,
        fkSensor,
        dataLeitura,
        DATE_FORMAT(dataLeitura,'%H:%i:%s') as dataLeitura
    FROM medida
    WHERE fkSensor = ${idTanque}
    ORDER BY idMedida DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idTanque) {

    var instrucaoSql = `
    SELECT 
        leitura,
        fkSensor,
        dataLeitura,
        DATE_FORMAT(dataLeitura,'%H:%i:%s') as dataLeitura
    FROM medida
    WHERE fkSensor = ${idTanque}
    ORDER BY idMedida DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
