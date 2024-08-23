const mysql = require("mysql2");


const connectionConfig = {
    host: process.env.MYSQL_HOST || 'mysql',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'your_mysql_root_password',
    database: process.env.MYSQL_DATABASE || 'test',
};

let connection;
const connectWithRetry = () => {
    connection = mysql.createConnection(connectionConfig);
    connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        console.log('Retrying in 10 seconds...');
        setTimeout(connectWithRetry, 100000); // Retry after 5 seconds
    } else {
        console.log('Connected to MySQL as id ' + connection.threadId);
    }
    });
};

connectWithRetry();


const con = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'mysql',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'your_mysql_root_password',
    database: process.env.MYSQL_DATABASE || 'test',
    dateStrings: "date",
});

module.exports = con;
