var database = require("../database/config");

function buscarTanquesPorEmpresa(idEmpresa) {

  var instrucaoSql = `SELECT * FROM tanque JOIN metricas ON idTanque = fkTanque 
WHERE fkEmpresa = ${idEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function retornarTanque(idEmpresa) {

  var instrucaoSql = `SELECT * FROM tanque JOIN metricas ON idTanque = fkTanque WHERE idTanque = ?;`
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

function inserirMetricas(estadoAlerta, estadoCritico, idTanque) {

  return new Promise((resolve, reject) => {
    // Verifica se o usuário já tem um jogo favorito
    var instrucaoSqlVerificar = `
        SELECT * FROM metricas WHERE fkTanque = ${idTanque};
    `;

    database.executar(instrucaoSqlVerificar).then(resultados => {
      if (resultados.length > 0) {
        // Se o usuário já tem um favorito, faz o UPDATE
        var instrucaoSql = `
            UPDATE metricas SET alerta = ${estadoAlerta}, critico = ${estadoCritico} WHERE fkTanque = ${idTanque};
            `;
        return database.executar(instrucaoSql);
      } else {
        // Se o usuário não tem um favorito, faz o INSERT
        var instrucaoSql = `
            INSERT INTO metricas (alerta, critico, fkTanque) VALUES (${estadoAlerta}, ${estadoCritico}, ${idTanque});
            `;
        return database.executar(instrucaoSql);
      }
    }).then(resultado => {
      resolve(resultado);
    }).catch(erro => {
      reject(erro);
    });
  });
}

function retornarMetricas(idTanque) {

  var instrucaoSql = `SELECT * FROM tanque JOIN metricas ON idTanque = fkTanque WHERE fkTanque = ${idTanque};
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarTanquesPorEmpresa,
  inserirReabastecimentos,
  retornarTanque,
  alerta,
  contarAlerta,
  inserirMetricas,
  retornarMetricas
}
