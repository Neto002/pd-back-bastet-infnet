const sequelize = require("../../config/database");
const Curso = require("../models/Curso");
const Inscricao = require("../models/Inscricao");
const { Op } = require("sequelize");

const CursoService = {
  async listarCursos(usuarioId, filtro) {
    const whereClause = filtro
      ? {
          [Op.or]: [
            { nome: { [Op.like]: `%${filtro}%` } },
            { descricao: { [Op.like]: `%${filtro}%` } },
          ],
        }
      : {};

    const cursos = await Curso.findAll({
      where: whereClause,
      include: [
        {
          model: Inscricao,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM INSCRICOES WHERE INSCRICOES.CURSO_ID = Curso.ID)"
            ),
            "total_inscricoes",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM INSCRICOES WHERE INSCRICOES.CURSO_ID = Curso.ID AND INSCRICOES.USUARIO_ID = ${usuarioId})`
            ),
            "usuario_inscrito",
          ],
        ],
      },
    });

    return cursos.map((curso) => ({
      id: curso.id,
      nome: curso.nome,
      descricao: curso.descricao,
      capa: curso.capa,
      inscricoes: curso.getDataValue("total_inscricoes"),
      inicio: new Date(curso.inicio).toLocaleDateString("pt-BR"),
      inscrito: curso.getDataValue("usuario_inscrito") > 0,
    }));
  },
  async listarCursosInscritos(usuarioId) {
    const cursosInscritos = await Curso.findAll({
      include: [
        {
          model: Inscricao,
          where: { USUARIO_ID: usuarioId },
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM INSCRICOES WHERE INSCRICOES.CURSO_ID = Curso.ID)"
            ),
            "total_inscricoes",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM INSCRICOES WHERE INSCRICOES.CURSO_ID = Curso.ID AND INSCRICOES.USUARIO_ID = ${usuarioId} AND INSCRICOES.DATA_CANCELAMENTO IS NULL)`
            ),
            "data_cancelamento_inscricao",
          ],
        ],
      },
    });

    return cursosInscritos.map((curso) => ({
      id: curso.id,
      nome: curso.nome,
      descricao: curso.descricao,
      capa: curso.capa,
      inscricoes: curso.getDataValue("total_inscricoes"),
      inicio: new Date(curso.inicio).toLocaleDateString("pt-BR"),
      inscricao_cancelada:
        curso.getDataValue("data_cancelamento_inscricao") > 0,
      inscrito: true, // Todos os cursos retornados aqui são inscritos
    }));
  },
};

module.exports = CursoService;
