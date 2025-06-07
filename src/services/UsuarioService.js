const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Usuario = require("../models/Usuario");

const UsuarioService = {
  async criarUsuario({ nome, email, senha, nascimento }) {
    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      throw new Error("Usuário já existe");
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const nascimentoDate = moment(nascimento, "DD/MM/YYYY", true);

    // Cria o usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      nascimento: nascimentoDate.toDate(),
    });

    return {
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      nascimento: nascimentoDate.format("DD/MM/YYYY"),
    };
  },

  async listarUsuarios() {
    const usuarios = await Usuario.findAll();
    return usuarios.map((usuario) => {
      // Remove a senha do objeto retornado
      const { senha, ...usuarioSemSenha } = usuario.toJSON();
      return usuarioSemSenha;
    });
  },

  async login({ email, senha }) {
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  },
};

module.exports = UsuarioService;
