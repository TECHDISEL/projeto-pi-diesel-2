var database = require("../database/config");

function buscarTanquesPorEmpresa(idEmpresa) {

  var instrucaoSql = `SELECT * FROM tanque
WHERE fkEmpresa = ${idEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function retornarTanque(idEmpresa) {

  var instrucaoSql = `SELECT * FROM tanque WHERE idTanque = ?;`
  [req.params.idTanque];

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);

}

function alerta(idMedida, leitura) {
  var instrucaoSql = `
  INSERT INTO alerta(fkMedida, leitura, dataLeitura) VALUES
  (${idMedida}, ${leitura}, now());
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function contarAlerta(idTanque) {
  const instrucaoSql = `
      SELECT COUNT(*) AS numeroAlerta 
      FROM alerta
      JOIN medida ON medida.idMedida = alerta.fkMedida
      JOIN tanque ON tanque.fkSensor = medida.fkSensor
      WHERE tanque.idTanque = ${idTanque}
      AND alerta.dataLeitura >= DATE_SUB(NOW(), INTERVAL 10 DAY);
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function inserirReabastecimentos(idEmpresa, idTanque, qtdeReabastecida, dataReabastecimento) {
  var instrucaoSql = `
      INSERT INTO abastecimento (fkEmpresa, fkTanque, dataAbastecimento, volumeReabastecido) VALUES (${idEmpresa}, ${idTanque}, '${dataReabastecimento}', '${qtdeReabastecida}')
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function inserirMetricas( idTanque, metricaAlerta, metricaCritico){
  var instrucaoSql = `
      INSERT INTO metricas (fkTanque, alerta, critico) VALUES (${idTanque}, '${metricaAlerta}', '${metricaCritico}')
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarTanquesPorEmpresa,
  inserirReabastecimentos,
  retornarTanque,
  alerta,
  contarAlerta,
  inserirMetricas
}
