const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root_password",
    database: "test",
    dateStrings: "date",
});

module.exports = con;

con.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
    
    return;
    }
    console.log("Connected to the database as id " + con.threadId);

    con.query("SELECT * FROM example", (error, results) => {
    if (error) throw error;
    console.log("Query Results:", results);
    });

    con.end();
});
