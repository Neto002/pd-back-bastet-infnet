const express = require("express");
const router = express.Router();
const CursoController = require("../controllers/CursoController");

// Rota para listar todos os cursos
router.get("/", CursoController.listarCursos);

module.exports = router;
