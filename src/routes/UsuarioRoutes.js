const express = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const router = express.Router();

// Rota para criar um novo usuário
router.post("/", UsuarioController.criarUsuario);
router.get("/", UsuarioController.listarUsuarios);

module.exports = router;
