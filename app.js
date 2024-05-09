const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');

  const sql = 'SELECT * FROM your_table_name';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log('Results:', results);
    connection.end();
  });
});

connection.query(sql, (err, results) => {
  if (err) throw err;
  console.log('ID:', results[0].id);
  console.log('Name:', results[0].name);
  console.log('Email:', results[0].email);
  connection.end();
});
*/
http.createServer((req, res) => {
  const filePath = './plik.html';
  const p1 = 'Pytanie 1'; //Do pytan w bazie dodac <br> itp. i modlic sie ze zadziala
  const p2 = 'Home page'; // i odpowiedzi w tym samym polu
  const p3 = 'Home page';

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      res.statusCode = 500;
      res.end(err.message);
      return;
    }

    html = html.replace('{ p1 }', p1);
    html = html.replace('{ p2 }', p2);
    html = html.replace('{ p3 }', p3);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
}).listen(3000);

// URL
// http://localhost:3000