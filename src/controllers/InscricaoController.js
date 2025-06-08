const InscricaoService = require("../services/InscricaoService");

const InscricaoController = {
  async inscrever(req, res) {
    try {
      const usuarioId = req.user.id;
      const cursoId = req.params.idCurso;

      await InscricaoService.inscrever(usuarioId, cursoId);

      res.status(201).json({ message: "Inscrição realizada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = InscricaoController;
