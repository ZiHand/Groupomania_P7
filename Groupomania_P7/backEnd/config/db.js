const { Sequelize } = require('sequelize');

require('dotenv').config({path: './config.env'});

// ===================================================
//               Sequelize Connection
// ===================================================
console.log(process.env.DB_USER_PASS);
const sequelize = new Sequelize("groupomania", "root", "Zigman#2022", {dialect: "mysql", host: "localhost"});

// ===================================================
//                Sequelize Export
// ===================================================
module.exports = sequelize;