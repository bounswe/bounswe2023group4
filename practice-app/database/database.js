const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'adventureworks',
  connectionLimit: 10, // Adjust this as per your needs
});

pool.query('SELECT * FROM address', (err, results, fields) => {
    if (err) {
      console.error('Error executing the query: ' + err);
      return;
    }
  
    // Process the results
    return console.log('Query results: ', results);
  });