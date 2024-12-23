const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Client = sequelize.define(
  "Client",
  {
    client_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    client_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
    charset: "utf8",
    createdAt: "created_date", // Specify the custom column name for createdAt
    updatedAt: "updated_date", // Specify the custom column name for updatedAt
    collate: "utf8_general_ci",
  }
);

module.exports = Client;
