const Inscricao = require("../models/Inscricao");
const Curso = require("../models/Curso");
const { EmptyResultError } = require("sequelize");

const sequelize = require("../../config/database");

const InscricaoService = {
  async inscrever(usuarioId, cursoId) {
    const curso = await Curso.findByPk(cursoId);

    // Lança exceção se o curso não for encontrado
    if (!curso) {
      throw new EmptyResultError("Curso não encontrado");
    }

    const existente = await Inscricao.findOne({
      where: {
        usuario_id: usuarioId,
        curso_id: cursoId,
        data_cancelamento: null,
      },
    });

    if (existente) {
      throw new Error("Usuário já inscrito neste curso");
    }

    const inscricao = await Inscricao.create({
      usuario_id: usuarioId,
      curso_id: cursoId,
      data_cancelamento: null,
    });

    return inscricao;
  },
  async cancelarInscricao(usuarioId, cursoId) {
    const curso = await Curso.findByPk(cursoId);

    // Lança exceção se o curso não for encontrado
    if (!curso) {
      throw new EmptyResultError("Curso não encontrado");
    }

    const result = await sequelize.query(
      `
      SELECT *
        FROM INSCRICOES
       WHERE USUARIO_ID = :usuarioId
         AND CURSO_ID = :cursoId
         AND DATA_CANCELAMENTO IS NULL
       LIMIT 1
      `,
      {
        replacements: { usuarioId, cursoId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Lança exceção se a inscrição não for encontrada ou já estiver cancelada
    if (!result || result.length === 0) {
      throw new EmptyResultError("Inscrição não encontrada ou já cancelada");
    }

    await sequelize.query(
      `
        UPDATE INSCRICOES
           SET DATA_CANCELAMENTO = CURRENT_TIMESTAMP
         WHERE ID = :id
      `,
      {
        replacements: { id: result[0].ID },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return { ...result, data_cancelamento: new Date() };
  },
};

module.exports = InscricaoService;
