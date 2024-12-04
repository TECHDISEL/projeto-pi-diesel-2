var tanqueModel = require("../models/tanqueModel");

function buscarTanquesPorEmpresa(req, res) {
  var idUsuario = req.params.idUsuario;

  tanqueModel.buscarTanquesPorEmpresa(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os tanques: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function retornarTanque(req, res) {

  res.json(retornarTanque(req.params.idTanque));

  tanqueModel.retornarTanque(idTanque).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os tanques: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function alerta(req, res) {
  var idMedida = req.body.idMedidaServer;
  var leitura = req.body.leituraServer;

  if (!idMedida) {
    res.status(400).send("idMedida está undefined!");
  } else if (!leitura) {
    res.status(400).send("leitura está undefined!");
  }

  tanqueModel.alerta(idMedida, leitura)
    .then(
      function (resultado) {
        console.log(`Resultado inserção de alerta: ${JSON.stringify(resultado)}`);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar a inserção de alertas ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );

}

function contarAlerta(req, res) {
  const idTanque = req.params.idTanque;

  if (!idTanque) {
      res.status(400).send("idTanque está undefined!");
      return;
  }

  tanqueModel.contarAlerta(idTanque)
      .then(function (resultado) {
          if (resultado.length > 0) {
              res.json({
                  numeroAlerta: resultado[0].numeroAlerta
              });
          } else {
              res.status(204).json({ numeroAlerta: 0 });
          }
      })
      .catch(function (erro) {
          console.error("Erro ao contar alertas: ", erro.sqlMessage || erro);
          res.status(500).json({ erro: "Erro ao contar alertas" });
      });
}

function inserirReabastecimentos(req, res) {
  var qtdeReabastecida = req.body.qtdeReabastecimento;
  var dataReabastecimento = req.body.dataReabastecimento;
  var idEmpresa = req.body.idEmpresa;
  var idTanque = req.body.idTanque;

  console.log('Cadastrar na controller')
  tanqueModel.inserirReabastecimentos(idEmpresa, idTanque, qtdeReabastecida, dataReabastecimento)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao inserir o reabastecimento! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
}


module.exports = {
  buscarTanquesPorEmpresa,
  retornarTanque,
  alerta,
  contarAlerta,
  inserirReabastecimentos
}