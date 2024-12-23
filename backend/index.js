const express = require("express");
const cors = require("cors");
const sequelize = require("./config/dbConfig");
const callRoutes = require("./serve");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

sequelize
  .sync()
  .then(() => {
    console.log("Connected to the database and synchronized models");
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Routes configuration
app.use("/api", callRoutes);

module.exports = app;
