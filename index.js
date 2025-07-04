const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const CursoRouter = require("./src/routes/CursoRoutes");
const UsuarioRouter = require("./src/routes/UsuarioRoutes");
const AuthRouter = require("./src/routes/AuthRoutes");

const CursoController = require("./src/controllers/CursoController");

const authMiddleware = require("./src/middlewares/authMiddleware");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/login", AuthRouter);
app.use("/usuarios", UsuarioRouter);
app.use("/cursos", authMiddleware, CursoRouter);
app.use("/:idUsuario", authMiddleware, CursoController.listarCursosInscritos);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");

    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((error) => console.error("Error synchronizing the database:", error));
