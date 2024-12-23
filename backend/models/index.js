//Import sequelize
const sequelize = require("../config/dbConfig");

// Import models
const User = require("./User");
const Client = require("./Clients");

// ---------------------------------------------------------------------- Export models  ----------------------------------------------------------------------
module.exports = {
  User,
  Client,
  sequelize,
};
