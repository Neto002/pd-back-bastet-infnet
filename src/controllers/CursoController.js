const CursoService = require("../services/CursoService");

const CursoController = {
  async listarCursos(req, res) {
    try {
      const filtro = req.query.filtro || null;
      const usuarioId = req.user.id;
      const cursos = await CursoService.listarCursos(usuarioId, filtro);
      res.status(200).json(cursos);
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      res.status(500).json({ message: "Erro ao listar cursos" });
    }
  },
  async listarCursosInscritos(req, res) {
    try {
      const idUsuario = parseInt(req.params.idUsuario);
      const idUsuarioToken = req.user.id;

      if (idUsuarioToken !== idUsuario) {
        return res.status(403).json({
          message: "Só é permitido visualizar as próprias inscrições!",
        });
      }

      const cursosInscritos = await CursoService.listarCursosInscritos(
        idUsuarioToken
      );

      res.status(200).json(cursosInscritos);
    } catch (error) {
      console.error("Erro ao listar cursos inscritos:", error);
      res.status(500).json({ message: "Erro ao listar cursos inscritos" });
    }
  },
};

module.exports = CursoController;
