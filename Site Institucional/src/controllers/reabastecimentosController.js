var reabastecimentosModel = require("../models/reabastecimentosModel");

function exibirReabastecimentos(req, res) {

    const idEmpresa = req.params.idEmpresa

    reabastecimentosModel.exibirReabastecimentos(idEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os reabastecimentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarReabastecimento(req, res) {
    const idReabastecimento = req.params.idReabastecimento;

    // Validação básica do ID
    if (!idReabastecimento || isNaN(idReabastecimento)) {
        return res.status(400).json({ mensagem: "ID inválido!" });
    }

    reabastecimentosModel.deletarReabastecimento(idReabastecimento)
        .then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json({ mensagem: "Reabastecimento deletado com sucesso!" });
            } else {
                res.status(404).json({ mensagem: "Reabastecimento não encontrado!" });
            }
        })
        .catch((erro) => {
            console.error(`Erro ao deletar reabastecimento com ID ${idReabastecimento}:`, erro.sqlMessage);
            res.status(500).json({ mensagem: "Erro interno no servidor!" });
        });
}


module.exports = {
    exibirReabastecimentos,
    deletarReabastecimento
}