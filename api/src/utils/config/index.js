require("dotenv").config();

module.exports = {
  dbPort: process.env.DB_PORT || "5432",
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "12345",
  dbHost: process.env.DB_HOST || "localhost",
  dbName: process.env.DB_NAME || "countries",
};
