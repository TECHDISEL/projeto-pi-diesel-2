var express = require("express");
var router = express.Router();
var reabastecimentosController = require("../controllers/reabastecimentosController");

router.get("/listar/:idEmpresa", function (req, res) {
    reabastecimentosController.exibirReabastecimentos(req, res);
});

router.delete("/deletar/:idReabastecimento", function (req, res) {
    reabastecimentosController.deletarReabastecimento(req, res);
});


module.exports = router;