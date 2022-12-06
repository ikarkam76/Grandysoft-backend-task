const mysql = require('mysql');
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD } = process.env;

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD
});

module.exports = { connection };
