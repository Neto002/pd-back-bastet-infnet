const express = require("express");
const sequelize = require("./config/database");
const CursoRouter = require("./src/routes/CursoRoutes");
const UsuarioRouter = require("./src/routes/UsuarioRoutes");
const AuthRouter = require("./src/routes/AuthRoutes");

const CursoController = require("./src/controllers/CursoController");

const authMiddleware = require("./src/middlewares/authMiddleware");

require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use("/login", AuthRouter);
app.use("/:idUsuario", authMiddleware, CursoController.listarCursosInscritos);
app.use("/cursos", authMiddleware, CursoRouter);
app.use("/usuarios", authMiddleware, UsuarioRouter);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");

    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((error) => console.error("Error synchronizing the database:", error));
