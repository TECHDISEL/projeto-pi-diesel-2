var database = require("../database/config");

function exibirReabastecimentos(idEmpresa) {

  var instrucaoSql = `SELECT * FROM abastecimento JOIN tanque ON idTanque = fkTanque WHERE abastecimento.fkEmpresa = ${idEmpresa};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletarReabastecimento(idReabastecimento) {

    var instrucaoSql = `DELETE FROM abastecimento WHERE idAbastecimento = ${idReabastecimento}`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }


module.exports = {
    exibirReabastecimentos,
    deletarReabastecimento
  }