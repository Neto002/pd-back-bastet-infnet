const { EmptyResultError } = require("sequelize");
const InscricaoService = require("../services/InscricaoService");

const InscricaoController = {
  async inscrever(req, res) {
    try {
      const usuarioId = req.user.id;
      const cursoId = req.params.idCurso;

      await InscricaoService.inscrever(usuarioId, cursoId);

      res.status(200).json({ message: "Inscrição realizada com sucesso" });
    } catch (error) {
      if (error instanceof EmptyResultError) {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  },
  async cancelarInscricao(req, res) {
    try {
      const usuarioId = req.user.id;
      const cursoId = req.params.idCurso;

      await InscricaoService.cancelarInscricao(usuarioId, cursoId);

      res.status(200).json({ message: "Inscrição cancelada com sucesso" });
    } catch (error) {
      if (error instanceof EmptyResultError) {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = InscricaoController;
