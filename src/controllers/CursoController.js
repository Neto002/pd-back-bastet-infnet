const CursoService = require("../services/CursoService");

const CursoController = {
  async listarCursos(req, res) {
    try {
      const cursos = await CursoService.listarCursos();
      res.status(200).json(cursos);
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      res.status(500).json({ message: "Erro ao listar cursos" });
    }
  },
};

module.exports = CursoController;
