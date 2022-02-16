const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificult: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    season: {
      type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
    },
  });
};
