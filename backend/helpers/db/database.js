const mysql = require('mysql2/promise');

async function  connectionDatabase () {
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'fonles',
        password: "Fonles2023.",
        database: 'drive',
        port: 8889
    });
    return connection;
}

module.exports = connectionDatabase;
