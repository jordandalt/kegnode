require('dotenv').config();

module.exports = {
  host: "localhost",
  username: process.env.DB_USER,
  password: process.env.DB_USER_PASS,
  database: "kegnode",
  dialect: "postgres",
};
