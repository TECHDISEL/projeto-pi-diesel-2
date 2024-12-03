var database = require("../database/config");

function buscarTanquesPorEmpresa(idEmpresa) {

  var instrucaoSql = `SELECT * FROM tanque WHERE fkEmpresa = ${idEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function retornarTanque(idEmpresa) {

  var instrucaoSql = `SELECT * FROM tanque WHERE idTanque = ?;`
  [req.params.idTanque];

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);

}

function alerta(fkTanque, fkSensor, leitura, dataLeitura){
  var instrucaoSql = `
  INSERT INTO alerta(fkTanque, fkSensor, leitura, dataLeitura) VALUES
  (${fkTanque}, ${fkSensor}, ${leitura}, ${dataLeitura});
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function contarAlerta(){
  var instrucaoSql = `
  SELECT COUNT(leitura) as numeroAlerta FROM alerta;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarTanquesPorEmpresa,
  retornarTanque,
  alerta,
  contarAlerta
}