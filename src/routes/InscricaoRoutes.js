const express = require("express");
const InscricaoController = require("../controllers/InscricaoController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

module.exports = router;
