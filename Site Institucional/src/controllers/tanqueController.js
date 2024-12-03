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
  var fkTanque = req.body.fkTanqueServer;
  var fkSensor = req.body.fkSensorServer;
  var leitura = req.body.leituraServer;
  var dataLeitura = req.body.dataLeituraServer;

  if (!fkTanque) {
    res.status(400).send("fkTanque está undefined!");
  } else if (!fkSensor) {
    res.status(400).send("fkSensor está undefined!");
  } else if (!leitura) {
    res.status(400).send("leitura está undefined!");
  } else if (!dataLeitura) {
    res.status(400).send("dataLeitura está undefined!");
  }

  tanqueModel.alerta(fkTanque, fkSensor, leitura, dataLeitura)
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
  tanqueModel.contarAlerta()
    .then(function (resultado) {
      console.log(`Resultado da contagem de alertas: ${JSON.stringify(resultado)}`);

      if (resultado.length > 0) {
        res.json({
          numeroAlerta: resultado[0].numeroAlerta
        });
      } else {
        res.status(204).json({ tanques: [] });
      }

    }).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

module.exports = {
  buscarTanquesPorEmpresa,
  retornarTanque,
  alerta,
  contarAlerta
}