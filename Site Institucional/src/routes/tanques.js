var express = require("express");
var router = express.Router();
var tanqueController = require("../controllers/tanqueController");

router.get("/:idEmpresa", function (req, res) {
  tanqueController.buscarTanquesPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  tanqueController.cadastrar(req, res);
})

// Retornar o tanque selecionado
router.get("/tanques/:idTanque", function (req, res) {
  tanqueController.retornarTanque(req, res);
});

router.post("/alerta", function (req, res) {
  tanqueController.alerta(req, res);
});

router.get("/contarAlerta/:idTanque", function (req, res) {
  tanqueController.contarAlerta(req, res);
});

router.post("/reabastecimento", function (req, res) {
  tanqueController.inserirReabastecimentos(req, res);
});

router.post("/metricas", function (req, res) {
  tanqueController.inserirMetricas(req, res);
});


module.exports = router;