const UsuarioService = require("../services/UsuarioService");

const UsuarioController = {
  async criarUsuario(req, res) {
    try {
      const resultado = await UsuarioService.criarUsuario(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async listarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.listarUsuarios();

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar usuários" });
    }
  },
  async login(req, res) {
    try {
      const token = await UsuarioService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = UsuarioController;
