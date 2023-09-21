const mysql = require('mysql2')

const pool = mysql.createPool({
    host : "localhost",
    user : "root" ,
    password : "root",
    database : "testdb"
});

module.exports = pool.promise();