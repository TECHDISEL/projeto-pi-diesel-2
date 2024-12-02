var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idTanque", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idTanque", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/carregarDadosMensais/:idTanque", function (req, res) {
    medidaController.buscarMedidasMensais(req, res);
});


module.exports = router;