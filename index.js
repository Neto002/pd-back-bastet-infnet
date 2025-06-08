const express = require("express");
const sequelize = require("./config/database");
const CursoRouter = require("./src/routes/CursoRoutes");
const UsuarioRouter = require("./src/routes/UsuarioRoutes");
const AuthRouter = require("./src/routes/AuthRoutes");
const InscricaoRouter = require("./src/routes/InscricaoRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use("/auth", AuthRouter);
app.use("/cursos", CursoRouter);
app.use("/usuarios", UsuarioRouter);
app.use("/inscricoes", InscricaoRouter);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");

    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((error) => console.error("Error synchronizing the database:", error));
