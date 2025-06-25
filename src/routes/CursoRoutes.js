const express = require("express");
const router = express.Router();
const CursoController = require("../controllers/CursoController");
const InscricaoController = require("../controllers/InscricaoController");

// Rota para listar todos os cursos
router.get("/", CursoController.listarCursos);

router.post("/:idCurso", InscricaoController.inscrever);
router.patch("/:idCurso", InscricaoController.cancelarInscricao);

module.exports = router;
