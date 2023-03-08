const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@UUk#3p3CG$5cGLM',
    database: 'company_inventories_database'
});

connection.connect((error) => {
    if (error) {
      console.log('Error connecting to database: ', error);
    } else {
      console.log('Database connection established');
    }
});
  
module.exports = connection;