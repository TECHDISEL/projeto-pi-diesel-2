var database = require("../database/config");

function buscarTanquesPorEmpresa(idEmpresa) {

  var instrucaoSql = `SELECT * FROM tanque WHERE fkEmpresa = ${idEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarTanquesPorEmpresa,
}