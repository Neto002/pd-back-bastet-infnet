const express = require("express");
const sequelize = require("./config/database");
const CursoRouter = require("./src/routes/CursoRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/cursos", CursoRouter);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");

    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((error) => console.error("Error synchronizing the database:", error));
