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

module.exports = {
    buscarTanquesPorEmpresa
  }