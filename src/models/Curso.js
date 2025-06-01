const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Curso = sequelize.define(
  "Curso",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    capa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "CURSOS",
    timestamps: false,
  }
);

module.exports = Curso;
