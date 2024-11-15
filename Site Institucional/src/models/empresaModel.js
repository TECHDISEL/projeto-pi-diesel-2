var database = require("../database/config");

// function buscarPorId(id) {
//   var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

//   return database.executar(instrucaoSql);
// }

function listar() {
  var instrucaoSql = `SELECT idEmpresa, cnpj, nomeFantasia, razaoSocial, telefone, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM cadastro WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(rua, bairro, numero, cep, cidade) {
  var instrucaoSql = `
  INSERT INTO empresa (rua, bairro, numero, cep, cidade) VALUES ('${rua}', '${bairro}', '${numero}', '${cep}', '${cidade}');
  `;

  return database.executar(instrucaoSql);
}

module.exports = { 
    buscarPorCnpj, 
    // buscarPorId, 
    cadastrarEmpresa,
    listar 
};
