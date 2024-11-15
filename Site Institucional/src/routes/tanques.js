var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/tanqueController");

router.get("/:idEmpresa", function (req, res) {
  aquarioController.buscarTanquesPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;