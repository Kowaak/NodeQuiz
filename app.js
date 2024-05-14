const http = require('http');
const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'NodeQuiz'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Połączono z bazą!');

  const sql = 'SELECT * FROM pytania';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log('Wynik:', results);
    const p1 = results[0].pytanie;
    const p2 = results[1].pytanie;
    const p3 = results[2].pytanie;

    const w1 = results[0].odp;
    const w2 = results[1].odp;
    const w3 = results[2].odp;

    http.createServer((req, res) => {
      if (req.method === 'GET') {
        const filePath = './plik.html';

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
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const formData = new URLSearchParams(body);
          const answers = Array.from(formData.entries()).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});

        const answersArray = [answers['1'], answers['2'], answers['3']];
        const correctAnswers = [w1, w2, w3];
        let score = 0;

        for (let i = 0; i < answersArray.length; i++) {
            if (answersArray[i] === correctAnswers[i]) {
                score++;
            }
        }
            console.log('Odpowiedzi:', answersArray);
            console.log('Wynik:', score);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Wynik: '+score+'</h1>');
        });
      }
    }).listen(3000);

    connection.end();
  });
});
