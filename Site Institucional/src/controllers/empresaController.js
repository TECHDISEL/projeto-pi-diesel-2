var empresaModel = require("../models/empresaModel");

// function buscarPorCnpj(req, res) {
//   var cnpj = req.query.cnpj;

//   empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

// function listar(req, res) {
//   empresaModel.listar().then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

// function buscarPorId(req, res) {
//   var id = req.params.id;

//   empresaModel.buscarPorId(id).then((resultado) => {
//     res.status(200).json(resultado);
//   });
// }

function cadastrarEmpresa(req, res) {
  var rua = req.body.ruaServer;
  var bairro = req.body.bairroServer;
  var numero = req.body.numeroServer;
  var cep = req.body.cepServer;
  var cidade = req.body.cidadeServer;

//   empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
//     if (resultado.length > 0) {
//       res
//         .status(401)
//         .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
//     } else {
      empresaModel.cadastrarEmpresa(rua, bairro, numero, cep, cidade).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
//   });
// }

module.exports = {
//   buscarPorCnpj,
//   buscarPorId,
  cadastrarEmpresa
//   listar
};
