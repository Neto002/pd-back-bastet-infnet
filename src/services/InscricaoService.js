const Inscricao = require("../models/Inscricao");
const Usuario = require("../models/Usuario");
const Curso = require("../models/Curso");

const InscricaoService = {
  async inscrever(usuarioId, cursoId) {
    const curso = await Curso.findByPk(cursoId);

    if (!curso) {
      throw new Error("Curso não encontrado");
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
};

module.exports = InscricaoService;
