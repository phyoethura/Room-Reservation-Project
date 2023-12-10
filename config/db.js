const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    dateStrings: 'date',
});

module.exports = con;
