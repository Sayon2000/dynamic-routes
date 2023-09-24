const Sequelize = require('sequelize')

const sequelize = new Sequelize('shopping','root','root',{
    host : "localhost",
    dialect : "mysql"
});

module.exports = sequelize;